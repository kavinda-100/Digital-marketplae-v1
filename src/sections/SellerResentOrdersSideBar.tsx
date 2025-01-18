"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getSellerResentOrders } from "../actions/sellerDashboardActions";
import { cn, formatCurrency, formatDate } from "../lib/utils";
import { Skeleton } from "../components/ui/skeleton";

const SellerResentOrdersSideBar = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sellerRecentOrders"],
    queryFn: getSellerResentOrders,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={"w-full"}>
      <h3 className={"px-2 font-semibold"}>Resent Sales</h3>
      {isLoading && <Skeleton className={"h-[100px] w-full rounded-md"} />}
      {!isLoading && error && (
        <div className={"rounded-md border p-2 text-red-300"}>
          Error fetching data
        </div>
      )}
      {!isLoading &&
        !error &&
        data &&
        data.map((order, index) => (
          <Card className={"my-1 w-full"} key={index}>
            <CardHeader>
              <CardTitle className={"line-clamp-1"}>
                {order.product.name}
              </CardTitle>
              <CardDescription>{formatCurrency(order.amount)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={"flex items-center justify-evenly gap-2"}>
                <img
                  key={index}
                  src={order.product.thumbnail.map((t) => t.url)[0]}
                  alt={order.product.name}
                  className={"w-15 h-10 rounded-md"}
                />
                <div>
                  <p className={"text-xs text-gray-500"}>Date</p>
                  <p className={"text-xs"}>{formatDate(order.createdAt)}</p>
                </div>
                <div
                  className={cn("rounded border p-1 text-xs", {
                    "border-green-500 bg-green-500/10 text-green-600 dark:bg-green-500/20":
                      order.status === "COMPLETED",
                    "border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20":
                      order.status === "CANCELLED",
                    "border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20":
                      order.status === "PENDING",
                  })}
                >
                  {order.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      {data && data.length === 0 && (
        <div className={"rounded-md border p-2"}>No Recent Sales</div>
      )}
    </div>
  );
};
export default SellerResentOrdersSideBar;
