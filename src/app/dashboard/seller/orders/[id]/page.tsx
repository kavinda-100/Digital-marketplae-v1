import React from "react";

const ViewOrderPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return <div>ViewOrderPage {id}</div>;
};
export default ViewOrderPage;
