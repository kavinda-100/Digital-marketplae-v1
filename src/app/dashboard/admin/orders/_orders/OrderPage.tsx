"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../../../actions/adminDashboardActions";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { TableComponent } from "../../../../../components/table/TableComponent";
import { OrderColumns } from "./Columns";

const OrderPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-all-orders"],
    queryFn: getAllOrders,
  });

  if (isLoading) {
    return (
      <div className={"w-full"}>
        <Skeleton className={"h-[300px] w-full lg:h-[500px]"} />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={"w-full"}>
      <TableComponent
        columns={OrderColumns}
        data={data ?? []}
        FilterInputPlaceholder={"Search by product name"}
        NameForFilter={"productName"}
        showExportToExcel={false}
      />
    </div>
  );
};
export default OrderPage;
