import React from "react";
import { Skeleton } from "../../components/ui/skeleton";

const UiLoadingPage = () => {
  return (
    <section className={"container mx-auto p-2"}>
      <div className={"grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"}>
        <Skeleton className={"h-[280px] w-full"} />
        <Skeleton className={"h-[280px] w-full"} />
        <Skeleton className={"h-[280px] w-full"} />
        <Skeleton className={"h-[280px] w-full"} />
        <Skeleton className={"h-[280px] w-full"} />
        <Skeleton className={"h-[280px] w-full"} />
      </div>
    </section>
  );
};

export default UiLoadingPage;
