import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import { prisma } from "../../../../server/db";
import type { Plan, User } from "@prisma/client";

const STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET_KEY!;

export async function POST(req: Request) {
  console.log("POST /api/webhooks/stripe route hit.");
  let user: User | null = null;
  try {
    const body = await req.text();
    const header = await headers();
    const signature = header.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET_KEY,
    );

    const data = event.data;
    const eventType = event.type;

    switch (eventType) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          (data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items", "customer_details"],
          },
        );
        const customerId = session.customer as string;
        const customerDetails = session.customer_details!;
        const lineItems = session.line_items?.data ?? [];

        if (customerDetails.email) {
          user = await prisma.user.findUnique({
            where: {
              email: customerDetails.email,
            },
          });
          if (!user) {
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 },
            );
          }
          console.log("User found -checkout.session.completed", user);
          if (!user.StripeId) {
            const updatedUser = await prisma.user.update({
              where: {
                email: customerDetails.email,
              },
              data: {
                StripeId: customerId,
              },
            });
            if (updatedUser) {
              console.log(
                "User StripeId is updated -checkout.session.completed",
                updatedUser,
              );
            } else {
              console.log(
                "User StripeId is not updated -checkout.session.completed",
                updatedUser,
              );
            }
          }
          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === "recurring";

            if (isSubscription) {
              let startDate;
              let endDate;
              let plan: Plan = "basic";
              const currentDate = new Date();

              if (
                priceId === process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRO_PRICE_ID
              ) {
                plan = "pro";
                startDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  1,
                );
                endDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1,
                );
              } else if (
                priceId ===
                process.env.NEXT_PUBLIC_STRIPE_MONTHLY_ENTERPRICE_PRICE_ID
              ) {
                plan = "enterprise";
                startDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  1,
                );
                endDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1,
                );
              } else {
                console.log(
                  "Invalid price id -checkout.session.completed",
                  priceId,
                );
                return NextResponse.json(
                  { error: "Invalid price id" },
                  { status: 400 },
                );
              }

              const subscription = await prisma.subscription.upsert({
                where: {
                  kindUserId: user.kindUserId,
                },
                update: {
                  plan: plan,
                  startDate: startDate,
                  endDate: endDate,
                },
                create: {
                  kindUserId: user.kindUserId,
                  plan: plan,
                  startDate: startDate,
                  endDate: endDate,
                },
              });

              if (!subscription) {
                console.log(
                  "Error creating subscription -checkout.session.completed",
                  subscription,
                );
                return NextResponse.json(
                  { error: "Error creating subscription" },
                  { status: 500 },
                );
              }
              console.log(
                "Subscription created -checkout.session.completed",
                subscription,
              );
            } else {
              // onetime purchase
              const { orderId } = session.metadata as { orderId: string };
              const shippingDetails = session.shipping_details?.address;

              await prisma.order.update({
                where: {
                  id: orderId,
                },
                data: {
                  status: "COMPLETED",
                  shippingDetails: {
                    create: {
                      address: shippingDetails?.line1 ?? "",
                      city: shippingDetails?.city ?? "",
                      state: shippingDetails?.state ?? "",
                      postalCode: shippingDetails?.postal_code ?? "",
                      country: shippingDetails?.country ?? "",
                    },
                  },
                },
              });
            }
          }
        }
        break;
      }
      case "checkout.session.expired": {
        const session = await stripe.checkout.sessions.retrieve(
          (data.object as Stripe.Checkout.Session).id,
        );
        await prisma.order.delete({
          where: { id: session.metadata!.orderId },
        });
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          (data.object as Stripe.Subscription).id,
        );
        const user = await prisma.user.findFirst({
          where: { StripeId: subscription.customer as string },
        });
        if (user) {
          await prisma.subscription.update({
            where: { kindUserId: user.kindUserId },
            data: {
              plan: "basic",
            },
          });
        } else {
          console.error("User not found for the subscription deleted event.");
          return NextResponse.json(
            { error: "User not found for the subscription deleted event" },
            { status: 404 },
          );
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${eventType}`);
        break;
    }

    console.log("Event processed successfully");
    return NextResponse.json({ received: true });
  } catch (e: unknown) {
    console.log("Error in POST /api/webhooks/stripe", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
