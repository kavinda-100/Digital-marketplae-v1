"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { CircleDollarSign, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleOrderProductByID } from "../../../actions/prodcutActions";
import { toast } from "sonner";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams?.get("order_id") ?? "";

  React.useEffect(() => {
    if (!productId) {
      toast.error("product id not found");
    }
  }, [productId]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", productId],
    queryFn: async () => {
      return await getSingleOrderProductByID({ productId });
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (error) {
    console.log("Error fetching order", error);
    toast.error("Error fetching order");
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

        {/*TODO: Show the order details*/}
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
      </div>
    </section>
  );
};
export default SuccessPage;
