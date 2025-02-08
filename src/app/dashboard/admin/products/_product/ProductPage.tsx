"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../../../../actions/adminDashboardActions";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { TableComponent } from "../../../../../components/table/TableComponent";
import { ProductPageColumns } from "./Columns";

const ProductPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-all-products"],
    queryFn: getAllProducts,
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
        columns={ProductPageColumns}
        data={data ?? []}
        FilterInputPlaceholder={"Search by product name"}
        NameForFilter={"name"}
        showExportToExcel={false}
      />
    </div>
  );
};
export default ProductPage;
