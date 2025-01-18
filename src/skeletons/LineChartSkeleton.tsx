import React from "react";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";

const LineChartSkeleton = () => {
  return (
    <Card className={"h-[200px] w-full lg:h-[400px]"}>
      <Skeleton className={"h-full w-full"} />
    </Card>
  );
};
export default LineChartSkeleton;
