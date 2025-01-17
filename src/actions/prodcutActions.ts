"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../server/db";
import { revalidatePath } from "next/cache";

export async function DeleteProductAction({ id }: { id: string }) {
  try {
    if (!id) {
      return { success: false, message: "Invalid Product ID" };
    }
    // check if the user is authenticated
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return { success: false, message: "Unauthorized" };
    }
    // check if the product exists
    const product = await prisma.product.findUnique({ where: { id } });
    // if the product does not exist, return an error
    if (!product) {
      return { success: false, message: "Product not found" };
    }
    console.log("Product found", product);
    // delete the thumbnail
    await prisma.thumbnail.deleteMany({ where: { productId: id } });
    // delete the product
    const deletedProduct = await prisma.product.delete({ where: { id } });
    // if the product is not deleted, return an error
    if (!deletedProduct) {
      return {
        success: false,
        message: "An error occurred while deleting the product",
      };
    }
    console.log("deletedProduct", deletedProduct);
    // revalidate the product
    revalidatePath("/", "layout");
    // return the success response
    return { success: true, message: "Product deleted successfully" };
  } catch (e: unknown) {
    console.log("Error in DELETE product action", e);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function getSingleOrderProductByID({
  orderId,
}: {
  orderId: string;
}) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        amount: true,
        status: true,
        shippingDetails: true,
        product: true,
      },
    });
    if (!order) {
      throw new Error("order not found");
    }
    return order;
  } catch (e: Error | any) {
    console.log("Error in getSingleOrderProductByID action", e);
    throw new Error(e.message || "Internal Server Error");
  }
}
