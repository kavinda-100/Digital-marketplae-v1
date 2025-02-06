import React from "react";
import { formatCurrency } from "../lib/utils";

type PriceTagProps = {
  price: number;
};

const PriceTag = ({ price }: PriceTagProps) => {
  return (
    <p
      className={
        "inline-flex w-fit items-center rounded-md bg-primary/10 px-2 py-1 font-mono text-xs font-bold text-primary ring-1 ring-inset ring-primary/10"
      }
    >
      {formatCurrency(price)}
    </p>
  );
};
export default PriceTag;
