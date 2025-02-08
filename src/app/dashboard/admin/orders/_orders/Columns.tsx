"use client";

import type { OrderStatus } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import React from "react";
import {
  cn,
  formatCurrency,
  formatDateForTable,
} from "../../../../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { Button } from "../../../../../components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import PriceTag from "../../../../../components/PriceTag";

type OrderColumnsType = {
  id: string;
  amount: number;
  isPaid: boolean;
  status: OrderStatus;
  createdAt: string;
  thumbnail: string | undefined;
  productName: string;
};

export const OrderColumns: ColumnDef<OrderColumnsType>[] = [
  {
    accessorKey: "thumbnail",
    header: "Product Thumbnail",
    cell: ({ row }) => {
      const url = row.original.thumbnail ?? "";
      const fallback = "N/A";
      return (
        <Avatar className={"size-10"}>
          <AvatarImage src={url} className={"object-fill"} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.productName ?? "N/A";
      return (
        <p className={"line-clamp-1 font-medium"}>
          {name.slice(0, 50) + "..."}
        </p>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount ?? 0;
      return <PriceTag price={amount} />;
    },
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => {
      const isPaid = row.original.isPaid ?? false;
      return (
        <div
          className={cn("rounded border p-1 text-center text-xs", {
            "border-green-500 bg-green-500/10 text-green-600 dark:bg-green-500/20":
              isPaid === true,
            "border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20":
              isPaid === false,
          })}
        >
          {isPaid ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status ?? "CANCELLED";
      return (
        <div
          className={cn("rounded border p-1 text-center text-xs", {
            "border-green-500 bg-green-500/10 text-green-600 dark:bg-green-500/20":
              status === "COMPLETED",
            "border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20":
              status === "CANCELLED",
            "border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20":
              status === "PENDING",
          })}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt ?? "N/A";
      return (
        <p className={"text-nowrap font-medium"}>
          {formatDateForTable(new Date(createdAt))}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const orderId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(orderId)}
              className={"cursor-pointer"}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuItem className={"cursor-pointer"}>
              <Link href={`/dashboard/admin/orders/${orderId}`}>
                View Order
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
