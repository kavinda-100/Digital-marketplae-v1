import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../server/db";

export async function getAdminStats() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const data = {
      revenue: 0,
      noOfUsers: 0,
      noOfSellers: 0,
      noOfProducts: 0,
      noOfOrders: 0,
      noOfSubscriptions: 0,
    };

    const [
      revenueResult,
      noOfUsersResult,
      noOfSellersResult,
      noOfProductsResult,
      noOfOrdersResult,
      noOfSubscriptionsResult,
    ] = await Promise.all([
      prisma.order.aggregate({
        _sum: {
          amount: true,
        },
      }),
      prisma.user.count(),
      prisma.onBoarding.aggregate({
        _count: {
          role: true,
        },
        where: {
          role: "SELLER",
        },
      }),
      prisma.product.count(),
      prisma.order.count(),
      prisma.subscription.count(),
    ]);

    if (revenueResult._sum?.amount) {
      data.revenue = revenueResult._sum.amount;
    }
    if (noOfUsersResult) {
      data.noOfUsers = noOfUsersResult;
    }
    if (noOfSellersResult._count?.role) {
      data.noOfSellers = noOfSellersResult._count.role;
    }
    if (noOfProductsResult) {
      data.noOfProducts = noOfProductsResult;
    }
    if (noOfOrdersResult) {
      data.noOfOrders = noOfOrdersResult;
    }
    if (noOfSubscriptionsResult) {
      data.noOfSubscriptions = noOfSubscriptionsResult;
    }

    return data;
  } catch (e: unknown) {
    console.log("Error in getAdminStats", e);
    throw new Error("Internal Server Error");
  }
}
