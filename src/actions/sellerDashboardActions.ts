import { prisma } from "../server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getSellerStats() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const data = {
      revenue: 0,
      noOfProducts: 0,
      noOfOrders: 0,
    };

    const [revenueResult, noOfProductsResult, noOfOrdersResult] =
      await Promise.all([
        prisma.order.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            sellerId: user.id,
          },
        }),
        prisma.product.count({
          where: {
            sellerId: user.id,
          },
        }),
        prisma.order.count({
          where: {
            sellerId: user.id,
          },
        }),
      ]);

    if (revenueResult._sum?.amount) {
      data.revenue = revenueResult._sum.amount;
    }
    if (noOfProductsResult) {
      data.noOfProducts = noOfProductsResult;
    }
    if (noOfOrdersResult) {
      data.noOfOrders = noOfOrdersResult;
    }

    return data;
  } catch (e: unknown) {
    console.log("Error in getSellerStats", e);
    throw new Error("Internal Server Error");
  }
}
