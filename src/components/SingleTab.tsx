import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import ProductCard from "./ProductCard";
import { getUsersProducts } from "../apiFile/sell";

type SingleTabProps = {
  kindUserId: string;
  type: "ICONS" | "UIKITS" | "TEMPLATES";
};
const SingleTab = async ({ kindUserId, type }: SingleTabProps) => {
  const data = await getUsersProducts({ kindUserId, type });

  if (!data || data.length === 0) {
    return (
      <div className={"flex w-full flex-col items-center justify-center"}>
        <div
          className={
            "rounded border border-green-500 bg-green-500/10 p-3 dark:bg-green-500/20"
          }
        >
          <p className={"text-sm font-medium text-muted-foreground"}>
            No products found. Click on the <strong>Add Product</strong> button
            to add a new product.
          </p>
        </div>
        <Button asChild className={"mt-4"}>
          <Link href={"/dashboard/seller/sell"}>Add Product</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className={"w-full"}>
      <div className={"grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"}>
        {data.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              shortDescription={product.shortDescription}
              price={product.price}
              thumbnail={product.thumbnail}
              isOwner={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SingleTab;
