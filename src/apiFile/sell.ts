import { prisma } from "@/server/db";
import { Api, handleAxiosError } from "./index";
import type { z } from "zod";
import type { ProductSchema } from "../zod/seller";

export const checkIsSeller = async (kindUserId: string) => {
  const data = await prisma.onBoarding.findUnique({
    where: {
      kindUserId: kindUserId,
    },
    select: {
      role: true,
    },
  });
  return data;
};

export const createProduct = async (product: z.infer<typeof ProductSchema>) => {
  try {
    const res = await Api.post("/product", product);
    return res.data;
  } catch (e) {
    handleAxiosError(e);
  }
};

export const getProductsByUserId = async ({
  kindUserId,
  type,
}: {
  kindUserId: string;
  type: "ICONS" | "UIKITS" | "TEMPLATES";
}) => {
  const data = await prisma.product.findMany({
    where: {
      sellerId: kindUserId,
      productType: type,
    },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      price: true,
      thumbnail: {
        select: {
          url: true,
          key: true,
        },
      },
    },
  });
  return data;
};

export const getProductsByType = async ({
  type,
  limit,
}: {
  type: "ICONS" | "UIKITS" | "TEMPLATES";
  limit: number;
}) => {
  const data = await prisma.product.findMany({
    where: {
      productType: type,
    },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      price: true,
      thumbnail: {
        select: {
          url: true,
          key: true,
        },
      },
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
