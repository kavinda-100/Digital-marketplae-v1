import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import ProductPage from "./_product/ProductPage";

const Page = () => {
  return (
    <section className={"container mx-auto"}>
      <Card className={"mt-4 border-0 shadow-sm"}>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductPage />
        </CardContent>
      </Card>
    </section>
  );
};
export default Page;
