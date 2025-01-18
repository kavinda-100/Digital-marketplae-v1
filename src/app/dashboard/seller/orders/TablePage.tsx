"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSellerOrders } from "../../../../actions/sellerDashboardActions";
import { TableComponent } from "../../../../components/table/TableComponent";
import { orderColumns } from "./columns";

const TablePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["sellerOrdersTable"],
    queryFn: getSellerOrders,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={"w-full"}>
      <TableComponent
        columns={orderColumns}
        data={data ?? []}
        FilterInputPlaceholder={"Search by product amount"}
        NameForFilter={"amount"}
        showExportToExcel={false}
      />
    </div>
  );
};
export default TablePage;
