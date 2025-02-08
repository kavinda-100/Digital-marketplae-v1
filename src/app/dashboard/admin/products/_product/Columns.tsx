"use client";

import React from "react";
import type { ProductType } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
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
import Link from "next/link";
import PriceTag from "../../../../../components/PriceTag";

type ProductPageColumnsType = {
  id: string;
  sellerId: string;
  name: string;
  shortDescription: string;
  price: number;
  productType: ProductType;
  thumbnail: string | undefined;
  createdAt: string;
};

export const ProductPageColumns: ColumnDef<ProductPageColumnsType>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const url = row.original.thumbnail ?? "";
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
          Product Name
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
    accessorKey: "shortDescription",
    header: "Short Description",
    cell: ({ row }) => {
      const shortDescription = row.original.shortDescription ?? "N/A";
      return (
        <p className={"line-clamp-1 font-medium"}>
          {shortDescription.slice(0, 50) + "..."}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price ?? 0;
      return <PriceTag price={price} />;
    },
  },
  {
    accessorKey: "productType",
    header: "Type",
    cell: ({ row }) => {
      const productType = row.original.productType ?? "N/A";
      return (
        <p
          className={cn(
            "rounded-md border bg-purple-300/30 px-2 py-1 font-bold",
            {
              "border-primary bg-primary/10 text-primary":
                productType === "TEMPLATES",
              "border-purple-500 bg-purple-300/30 text-purple-500":
                productType === "UIKITS",
              "border-cyan-500 bg-cyan-200/30 text-cyan-500":
                productType === "ICONS",
            },
          )}
        >
          {productType === "TEMPLATES"
            ? "Templates"
            : productType === "UIKITS"
              ? "UI Kits"
              : productType === "ICONS"
                ? "Icons"
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
        <p className={"text-nowrap font-medium"}>
          {formatDateForTable(new Date(createdAt))}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const productId = row.original.id;

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
              onClick={() => navigator.clipboard.writeText(productId)}
              className={"cursor-pointer"}
            >
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuItem className={"cursor-pointer"}>
              <Link href={`/product/${productId}`}>View Product</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
