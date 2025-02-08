"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../../../actions/adminDashboardActions";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { TableComponent } from "../../../../../components/table/TableComponent";
import { userTableColumns } from "./Column";

const UserPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-all-users"],
    queryFn: getAllUsers,
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
        columns={userTableColumns}
        data={data ?? []}
        FilterInputPlaceholder={"Search user by name"}
        NameForFilter={"name"}
        showExportToExcel={false}
      />
    </div>
  );
};
export default UserPage;
