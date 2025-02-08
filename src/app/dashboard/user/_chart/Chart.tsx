"use client";

import React from "react";
import type { ChartConfig } from "../../../../components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getUserLineChartData } from "../../../../actions/userDashboardActions";
import LineChartSkeleton from "../../../../skeletons/LineChartSkeleton";
import UserAreaChart from "./UserAreaChart";

const chartConfig = {
  amount: {
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
        <UserAreaChart
          data={data ?? []}
          chartConfig={chartConfig}
          error={error}
        />
      )}
    </div>
  );
};
export default Chart;
