import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import OrderPage from "./_orders/OrderPage";

const Page = () => {
  return (
    <section className={"container mx-auto"}>
      <Card className={"mt-4 border-0 shadow-sm"}>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderPage />
        </CardContent>
      </Card>
    </section>
  );
};
export default Page;
