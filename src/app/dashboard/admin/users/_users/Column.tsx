"use client";

import type { Role } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import React from "react";
import { Button } from "../../../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { cn, formatDateForTable } from "../../../../../lib/utils";

type UserColumnType = {
  id: string;
  email: string;
  name: string | null;
  profilePic: string | null;
  role: Role | undefined;
  createdAt: string;
};

export const userTableColumns: ColumnDef<UserColumnType>[] = [
  {
    accessorKey: "profilePic",
    header: "Profile Picture",
    cell: ({ row }) => {
      const url = row.original.profilePic ?? "";
      const fallback = row.original.name?.charAt(0) ?? "N/A";
      return (
        <Avatar className={"size-10"}>
          <AvatarImage src={url} className={"object-fill"} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name ?? "N/A";
      return (
        <p className={"line-clamp-1 font-medium"}>
          {name.slice(0, 50) + "..."}
        </p>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const Email = row.original.email ?? "N/A";
      return <p className={"line-clamp-1 font-medium"}>{Email}</p>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role ?? "N/A";
      return (
        <p
          className={cn("line-clamp-1 font-medium", {
            "text-red-500": role === "ADMIN",
            "text-green-500": role === "USER",
            "text-blue-500": role === "SELLER",
          })}
        >
          {role === "ADMIN"
            ? "Admin"
            : role === "USER"
              ? "User"
              : role === "SELLER"
                ? "Seller"
                : "N/A"}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt ?? "N/A";
      return (
        <p className={"line-clamp-1 font-medium"}>
          {formatDateForTable(createdAt)}
        </p>
      );
    },
  },
];
