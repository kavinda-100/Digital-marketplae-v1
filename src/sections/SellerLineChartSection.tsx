"use client";

import React from "react";
import { LineChartComponent } from "../components/charts/LineChart";
import type { ChartConfig } from "../components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getSellerLineChartData } from "../actions/sellerDashboardActions";
import LineChartSkeleton from "../skeletons/LineChartSkeleton";

// const chartData: exampleChartData[] = [
//   { month: "January", sales: 186, revenue: 80 },
//   { month: "February", sales: 160, revenue: 90 },
//   { month: "March", sales: 120, revenue: 100 },
//   { month: "April", sales: 140, revenue: 80 },
//   { month: "May", sales: 180, revenue: 70 },
//   { month: "June", sales: 210, revenue: 100 },
// ];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const SellerLineChartSection = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sellerLineChartData"],
    queryFn: getSellerLineChartData,
  });
  return (
    <div className={"w-full"}>
      {isLoading ? (
        <LineChartSkeleton />
      ) : (
        <LineChartComponent
          chartData={data ?? []}
          chartConfig={chartConfig}
          chartTitle={"Sales & Revenue"}
          error={error}
        />
      )}
    </div>
  );
};
export default SellerLineChartSection;
