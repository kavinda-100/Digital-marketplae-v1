import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import MyOrderTablePage from "../../../product/orders/my/TablePage";

const Page = () => {
  return (
    <section className={"container mx-auto"}>
      <Card className={"border-0 shadow-none"}>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <MyOrderTablePage />
        </CardContent>
      </Card>
    </section>
  );
};
export default Page;
