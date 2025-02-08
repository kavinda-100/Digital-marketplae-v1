"use client";

import React from "react";
import type { ChartConfig } from "../../../../components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getUserLineChartData } from "../../../../actions/userDashboardActions";
import LineChartSkeleton from "../../../../skeletons/LineChartSkeleton";
import { UserLineChart } from "./UserLineChart";

const chartConfig = {
  sales: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Chart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userLineChartData"],
    queryFn: getUserLineChartData,
  });
  return (
    <div className={"w-full"}>
      {isLoading ? (
        <LineChartSkeleton />
      ) : (
        <UserLineChart
          chartData={data ?? []}
          chartConfig={chartConfig}
          chartTitle={"Amount"}
          error={error}
        />
      )}
    </div>
  );
};
export default Chart;
