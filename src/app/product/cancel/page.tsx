import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Ban } from "lucide-react";

const CancelPage = () => {
  return (
    <section className={"container mx-auto flex items-center justify-center"}>
      <div className={"flex flex-col gap-4"}>
        <Card
          className={
            "border border-red-500/50 bg-red-500/10 dark:bg-red-500/20"
          }
        >
          <CardContent className={"mt-4"}>
            <div className={"my-2 flex w-full justify-center"}>
              <Ban className={"size-8 text-red-500"} />
            </div>
            <div className={"w-full text-center"}>
              <h1 className={"text-lg font-bold"}>Order Cancelled</h1>
              <p className={"text-gray-500"}>
                Your order has been cancelled successfully.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
export default CancelPage;
