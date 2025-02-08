"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersChartData } from "../../../actions/adminDashboardActions";
import LineChartSkeleton from "../../../skeletons/LineChartSkeleton";
import type { ChartConfig } from "../../ui/chart";
import UsersAreaChart from "./UsersAreaChart";

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const UsersAreaChartPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-all-users-ChartData"],
    queryFn: getAllUsersChartData,
  });
  console.log(data);
  console.log(error);

  return (
    <div className={"mt-4 w-full"}>
      {isLoading ? (
        <LineChartSkeleton />
      ) : (
        <UsersAreaChart
          data={data ?? []}
          error={error}
          chartConfig={chartConfig}
        />
      )}
    </div>
  );
};
export default UsersAreaChartPage;
