"use client";

import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams?.get("order_id") ?? "";

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
      </div>
    </section>
  );
};
export default SuccessPage;
