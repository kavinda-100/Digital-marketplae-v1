"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type UsersAreaChartProps = {
  data: exampleChartData[];
  error: Error | null;
  chartConfig: ChartConfig;
};

const SellerAreaChart = ({ data, chartConfig, error }: UsersAreaChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales & Revenue</CardTitle>
        <CardDescription>
          {`Showing Sales for ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date().getMonth())} - ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())} ${new Date().getFullYear()}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={"w-full"}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="var(--color-sales)"
              fillOpacity={0.4}
              stroke="var(--color-sales)"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {` ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date().getMonth())} - ${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())} ${new Date().getFullYear()}`}
            </div>
            {error && <div className="text-red-500">{error.message}</div>}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default SellerAreaChart;
