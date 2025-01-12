"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

type ProductType = {
  id: number;
  name: "ICONS" | "UIKITS" | "TEMPLATES";
  DisplayName: string;
};

const ProductTypeArray: ProductType[] = [
  {
    id: 1,
    name: "TEMPLATES",
    DisplayName: "Templates",
  },
  {
    id: 2,
    name: "UIKITS",
    DisplayName: "UI Kits",
  },
  {
    id: 3,
    name: "ICONS",
    DisplayName: "Icons",
  },
];

type ProductTypeProps = {
  productType: "ICONS" | "UIKITS" | "TEMPLATES";
  setProductType: React.Dispatch<
    React.SetStateAction<"ICONS" | "UIKITS" | "TEMPLATES">
  >;
};

const ProductType = ({ productType, setProductType }: ProductTypeProps) => {
  return (
    <div
      className={"grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"}
    >
      {ProductTypeArray.map((type) => (
        <Card
          key={type.id}
          className={cn("cursor-pointer rounded-lg p-4", {
            "border border-blue-500": productType === type.name,
          })}
          onClick={() => setProductType(type.name)}
        >
          <CardHeader>
            <CardTitle>{type.DisplayName}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ProductType;
