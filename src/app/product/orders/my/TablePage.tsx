"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TableComponent } from "../../../../components/table/TableComponent";
import { orderColumns } from "./columns";
import { Skeleton } from "../../../../components/ui/skeleton";
import { getMyOrders } from "../../../../actions/userActions";

const MyOrderTablePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["sellerOrdersTable"],
    queryFn: getMyOrders,
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
        columns={orderColumns}
        data={data ?? []}
        FilterInputPlaceholder={"Search by product name"}
        NameForFilter={"productName"}
        showExportToExcel={false}
      />
    </div>
  );
};
export default MyOrderTablePage;
