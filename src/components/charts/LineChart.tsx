"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDate } from "../../lib/utils";

// const chartData: exampleChartData[] = [
//   { month: "January", sales: 186, revenue: 80 },
//   { month: "February", sales: 160, revenue: 90 },
//   { month: "March", sales: 120, revenue: 100 },
//   { month: "April", sales: 140, revenue: 80 },
//   { month: "May", sales: 180, revenue: 70 },
//   { month: "June", sales: 210, revenue: 100 },
// ];
//
// const chartConfig = {
//   sales: {
//     label: "Sales",
//     color: "hsl(var(--chart-1))",
//   },
//   revenue: {
//     label: "Revenue",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

type LineChartComponentProps = {
  chartData: exampleChartData[];
  chartConfig: ChartConfig;
  chartTitle: string;
  trendingUpPercentage?: number;
  error: Error | null;
};

export function LineChartComponent({
  chartData,
  chartConfig,
  chartTitle,
  trendingUpPercentage,
  error,
}: LineChartComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{formatDate(new Date())}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="sales"
              type="natural"
              stroke="var(--color-sales)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-sales)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-revenue)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by {trendingUpPercentage ?? "0.0%"} this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last {new Date().getMonth() + 1} months
        </div>
        {error && <div className="text-sm text-red-500">{error.message}</div>}
      </CardFooter>
    </Card>
  );
}
