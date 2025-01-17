"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../server/db";
import { stripe } from "../lib/stripe";
import { AllowedCountries } from "../constans";

const DOMAIN_NAME =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.DOMAIN_NAME!;

export async function CreateStripeCheckOutSession({
  productId,
  sellerId,
  price,
}: {
  productId: string;
  sellerId: string;
  price: number;
}) {
  try {
    // get user from session
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    // check if user is not found
    if (!user) {
      new Error("User not found in Kind session");
      return;
    }
    // check if product is not found
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        price: true,
        name: true,
        shortDescription: true,
        thumbnail: true,
      },
    });
    // if product is not found
    if (!product) {
      new Error("Product not found");
      return;
    }
    // create order
    const newOrder = await prisma.order.create({
      data: {
        productId: productId,
        sellerId: sellerId,
        userId: user.id,
        amount: price,
        status: "PENDING",
        isPaid: false,
      },
    });
    // if order is not created
    if (!newOrder) {
      new Error("Order not created please try again");
      return;
    }
    // create stripe checkout session
    // prefill the email address
    const customer = await stripe.customers.create({
      email: user.email!,
    });
    const productImages = product.thumbnail.map((image) => {
      return image.url;
    });
    // create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "amazon_pay", "paypal"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.shortDescription,
              images: productImages,
            },
            unit_amount: price * 100, // convert to cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: newOrder.id,
      },
      mode: "payment",
      success_url: `${DOMAIN_NAME}/product/success?order_id=${newOrder.id}`,
      cancel_url: `${DOMAIN_NAME}/product/cancel`,
      shipping_address_collection: {
        allowed_countries: AllowedCountries,
      },
      customer: customer.id,
      // expires at 30 minutes(min value is 30 minutes)
      expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
    });
    return { url: session.url };
  } catch (error: Error | any) {
    console.error(error);
    throw new Error(error?.message ?? "Internal Server Error");
  }
}
