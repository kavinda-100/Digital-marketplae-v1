import React from "react";
import { Skeleton } from "../components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className={"w-full h-full p-2"}>
      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"}>
        <Skeleton className={"w-full h-[280px]"} />
        <Skeleton className={"w-full h-[280px]"} />
        <Skeleton className={"w-full h-[280px]"} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
