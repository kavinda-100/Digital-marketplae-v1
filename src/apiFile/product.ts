import { prisma } from "@/server/db";
import type { z } from "zod";
import type { ProductSchema } from "../zod/seller";
import { Api, handleAxiosError } from "./index";

export const getSingleProductById = async (id: string) => {
  try {
    return await prisma.product.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        sellerId: true,
        name: true,
        shortDescription: true,
        longDescription: true,
        price: true,
        productUrl: true,
        productType: true,
        thumbnail: {
          select: {
            url: true,
            key: true,
          },
        },
      },
    });
  } catch (e) {
    console.log("Error in getSingleProductById: ", e);
    return null;
  }
};

export const editProduct = async ({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof ProductSchema>;
}) => {
  try {
    const res = await Api.patch(`/product/${id}`, data);
    return res.data;
  } catch (e) {
    handleAxiosError(e);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await Api.delete(`/product/${id}`);
    return res.data;
  } catch (e) {
    handleAxiosError(e);
  }
};
