import React from "react";
import { getProductsByType } from "../apiFile/sell";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type SingleTypeProductCardsProps = {
  type: "ICONS" | "UIKITS" | "TEMPLATES";
  heading: string;
  isHome: boolean;
  limit: number;
  href?: "templates" | "icons" | "ui";
};

const SingleTypeProductCards = async ({
  type,
  heading,
  isHome,
  limit,
  href,
}: SingleTypeProductCardsProps) => {
  const products = await getProductsByType({ type, limit });

  if (isHome) {
    if (!products || products.length === 0) {
      return null;
    }
  } else {
    if (!products || products.length === 0) {
      return (
        <div className={"flex w-full flex-col items-center justify-center"}>
          <div
            className={
              "rounded border border-green-500 bg-green-500/10 p-3 dark:bg-green-500/20"
            }
          >
            <p className={"text-sm font-medium text-muted-foreground"}>
              No products found. Click on the <strong>Add Product</strong>{" "}
              button to add a new product.
            </p>
          </div>
          <Button asChild className={"mt-4"}>
            <Link href={"/dashboard/seller/sell"}>Add Product</Link>
          </Button>
        </div>
      );
    }
  }

  return (
    <div className={"my-8 h-auto w-full"}>
      {isHome && (
        <div className={"mb-5 flex w-full items-center justify-between"}>
          <h1 className={"text-md font-bold lg:text-lg"}>{heading}</h1>
          <Link href={`/${href}`}>
            <div
              className={
                "group flex cursor-pointer items-center justify-center gap-3"
              }
            >
              <p
                className={
                  "text-sm text-muted-foreground group-hover:opacity-50"
                }
              >
                more
              </p>
              <ArrowRight className={"size-4 group-hover:opacity-50"} />
            </div>
          </Link>
        </div>
      )}
      <div className={"grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"}>
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              shortDescription={product.shortDescription}
              price={product.price}
              thumbnail={product.thumbnail}
              isOwner={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SingleTypeProductCards;
