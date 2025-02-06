import React from "react";
import { prisma } from "../../../../../server/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import PriceTag from "../../../../../components/PriceTag";
import { cn, formatDate } from "../../../../../lib/utils";

async function getMyOrderDetails(id: string) {
  try {
    return await prisma.order.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        amount: true,
        status: true,
        isPaid: true,
        cancelReason: true,
        createdAt: true,
        canceledAt: true,
        product: {
          select: {
            name: true,
            price: true,
            shortDescription: true,
            thumbnail: true,
          },
        },
        shippingDetails: {
          select: {
            address: true,
            city: true,
            country: true,
            postalCode: true,
          },
        },
      },
    });
  } catch (e: unknown) {
    console.log("error in getMyOrderDetails", e);
    return null;
  }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const order = await getMyOrderDetails(id ?? "");
  if (!order) {
    return <div>Order not found</div>;
  }
  return (
    <section className={"container mx-auto"}>
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={"grid grid-cols-1 gap-7 lg:grid-cols-2"}>
            <div className={"flex w-full flex-col gap-3"}>
              <h1 className={"font-bold text-muted-foreground"}>
                Product Details
              </h1>
              <Wrapper>
                <p className={"font-semibold"}>Product Name</p>
                <p className={"font-medium"}>{order.product.name}</p>
              </Wrapper>
              <Wrapper>
                <p className={"font-semibold"}>Price</p>
                <PriceTag price={order.product.price ?? 0} />
              </Wrapper>
              <Wrapper>
                <p className={"font-semibold"}>Description</p>
                <p className={"line-clamp-1 text-right font-medium"}>
                  {order.product.shortDescription}
                </p>
              </Wrapper>
              <Wrapper>
                <p className={"font-semibold"}>Order Date</p>
                <p className={"font-medium"}>{formatDate(order.createdAt)}</p>
              </Wrapper>
            </div>
            <div className={"flex w-full flex-col gap-3"}>
              <h1 className={"font-bold text-muted-foreground"}>
                Shipping Details
              </h1>
              <Wrapper>
                <p className={"font-semibold"}>Address</p>
                <p className={"font-medium"}>
                  {order.shippingDetails?.address ?? ""}
                </p>
              </Wrapper>
              <Wrapper>
                <p className={"font-semibold"}>City</p>
                <p className={"font-medium"}>
                  {order.shippingDetails?.city ?? ""}
                </p>
              </Wrapper>
              <Wrapper>
                <p className={"font-semibold"}>Country</p>
                <p className={"font-medium"}>
                  {order.shippingDetails?.country ?? ""}
                </p>
              </Wrapper>
              <Wrapper>
                <p className={"font-semibold"}>Postal Code</p>
                <p className={"font-medium"}>
                  {order.shippingDetails?.postalCode ?? ""}
                </p>
              </Wrapper>
            </div>
          </div>
          <div className={"my-3 flex flex-col gap-3"}>
            <Wrapper>
              <p className={"font-semibold"}>Order Status</p>
              <div
                className={cn("rounded border p-1 text-center text-xs", {
                  "border-green-500 bg-green-500/10 text-green-600 dark:bg-green-500/20":
                    order.status === "COMPLETED",
                  "border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20":
                    order.status === "CANCELLED",
                  "border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20":
                    order.status === "PENDING",
                })}
              >
                {order.status}
              </div>
            </Wrapper>
            <Wrapper>
              <p className={"font-semibold"}>Paid</p>
              <div
                className={cn("rounded border p-1 text-center text-xs", {
                  "border-green-500 bg-green-500/10 text-green-600 dark:bg-green-500/20":
                    order.isPaid === true,
                  "border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20":
                    order.isPaid === false,
                })}
              >
                {order.isPaid ? "Yes" : "No"}
              </div>
            </Wrapper>
          </div>
          <div className={"my-3 flex flex-col gap-3"}>
            {order.cancelReason && (
              <Wrapper>
                <p className={"font-semibold"}>Cancel Reason</p>
                <p className={"text-pretty font-medium"}>
                  {order.cancelReason}
                </p>
              </Wrapper>
            )}
            {order.canceledAt && (
              <Wrapper>
                <p className={"font-semibold"}>Canceled At</p>
                <p className={"font-medium"}>{formatDate(order.canceledAt)}</p>
              </Wrapper>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className={"flex flex-wrap gap-3"}>
            {order.product.thumbnail?.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail.url ?? ""}
                alt={order.product.name}
                className={"h-32 w-32 rounded object-cover"}
              />
            ))}
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
export default Page;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={"flex justify-between gap-3 rounded bg-muted/10 p-2 shadow-sm"}
    >
      {children}
    </div>
  );
};
