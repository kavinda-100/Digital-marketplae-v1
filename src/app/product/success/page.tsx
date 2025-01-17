"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { CircleDollarSign, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleOrderProductByID } from "../../../actions/prodcutActions";
import { toast } from "sonner";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const SuccessPage = () => {
  const [enabled, setEnabled] = React.useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("order_id") ?? "";

  React.useEffect(() => {
    if (!orderId) {
      toast.error("product id not found");
    }
  }, [orderId]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      return await getSingleOrderProductByID({ orderId });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

  React.useEffect(() => {
    if (orderId) {
      setEnabled(true);
    }
  }, [orderId]);

  if (error) {
    toast.error(error?.message ?? "Error fetching order");
    console.log("Error fetching order", error);
  }

  return (
    <section className={"container mx-auto flex items-center justify-center"}>
      <div className={"flex flex-col gap-4"}>
        <Card
          className={
            "border border-green-500/50 bg-green-500/10 dark:bg-green-500/20"
          }
        >
          <CardContent className={"mt-4"}>
            <div className={"my-2 flex w-full justify-center"}>
              <CircleDollarSign className={"size-8 text-primary"} />
            </div>
            <div className={"w-full text-center"}>
              <h1 className={"text-lg font-bold"}>
                Thank you for your purchase
              </h1>
              <p className={"text-gray-500"}>
                Your order has been placed successfully
              </p>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <Card>
            <CardHeader>
              <CardTitle className={"flex items-center justify-center gap-3"}>
                <Loader2 className={"size-4 animate-spin"} />
                Loading...
              </CardTitle>
            </CardHeader>
          </Card>
        )}
        {error && (
          <p className={"text-center font-bold text-red-500/30"}>
            Error loading Your order details
          </p>
        )}
        {!isLoading && data && (
          <Card>
            <CardHeader>
              <CardTitle>Your order details</CardTitle>
              <CardDescription>Below Mention Summary of Order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={"flex flex-col gap-4"}>
                <h2 className={"border-b font-semibold text-muted-foreground"}>
                  Product Details:
                </h2>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>Product name:</span>
                  <span>{data.product.name.slice(0, 40) + "..."}</span>
                </div>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>Category:</span>
                  <span className={"capitalize"}>
                    {data.product.productType.toLocaleLowerCase()}
                  </span>
                </div>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>Amount:</span>
                  <span>{data.amount}</span>
                </div>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>Status:</span>
                  <span
                    className={cn("rounded border p-1 text-sm", {
                      "border-green-500 bg-green-500/10 text-green-600 dark:bg-green-500/20":
                        data.status === "COMPLETED",
                      "border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20":
                        data.status === "CANCELLED",
                      "border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20":
                        data.status === "PENDING",
                    })}
                  >
                    {data.status}
                  </span>
                </div>
                <h2 className={"border-b font-semibold text-muted-foreground"}>
                  Shipping Details:
                </h2>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>Address:</span>
                  <span>{data.shippingDetails?.address}</span>
                </div>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>City:</span>
                  <span>{data.shippingDetails?.city}</span>
                </div>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>Country:</span>
                  <span>{data.shippingDetails?.country}</span>
                </div>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>State:</span>
                  <span>{data.shippingDetails?.state}</span>
                </div>
                <div className={"flex items-center justify-between gap-3"}>
                  <span className={"font-bold"}>Postal Code:</span>
                  <span>{data.shippingDetails?.postalCode}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant={"secondary"} asChild>
                <Link href={"/product/orders/my"}>View My All Products</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </section>
  );
};
export default SuccessPage;
