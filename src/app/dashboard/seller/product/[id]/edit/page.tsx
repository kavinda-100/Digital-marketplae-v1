import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getSingleProductById } from "../../../../../../apiFile/product";
import { redirect } from "next/navigation";
import EditProductPage from "../../../../../../pages/EditProductPage";

const ProductEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const id = (await params).id;
  const data = await getSingleProductById(id);
  if (!user) {
    return redirect("/");
  }

  if (!data)
    return <div className={"text-center text-xl"}>Product not found</div>;
  return (
    <section className={"container mx-auto"}>
      <EditProductPage
        id={data.id}
        name={data.name}
        price={data.price}
        shortDescription={data.shortDescription}
        longDescription={data.longDescription}
        productUrl={data.productUrl}
        productType={data.productType}
        thumbnail={data.thumbnail}
      />
    </section>
  );
};
export default ProductEditPage;
