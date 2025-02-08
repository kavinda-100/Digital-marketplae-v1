"use client";

import React from "react";
import type { ChartConfig } from "../../ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getRevenueChartData } from "../../../actions/adminDashboardActions";
import LineChartSkeleton from "../../../skeletons/LineChartSkeleton";
import { AreaChartComponent } from "./AreaChart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const AreaChartPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["revenueChartData"],
    queryFn: getRevenueChartData,
  });

  return (
    <div className={"w-full"}>
      {isLoading ? (
        <LineChartSkeleton />
      ) : (
        <AreaChartComponent
          data={data ?? []}
          chartConfig={chartConfig}
          error={error}
        />
      )}
    </div>
  );
};
export default AreaChartPage;
