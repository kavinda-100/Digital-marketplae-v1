import React from "react";
import OrderDetailsPage from "./OrderDetailsPage";

const ViewOrderPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return (
    <section className={"container mx-auto p-2"}>
      <OrderDetailsPage orderId={id ?? ""} />
    </section>
  );
};
export default ViewOrderPage;
