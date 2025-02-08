"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../server/db";

export async function getUserStats() {
  try {
    const data = {
      spentAmount: 0,
      noOfOrders: 0,
      noOfOrdersCanceled: 0,
    };

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      console.log("user not found in getUserStats - unAuthorized");
      return data;
    }

    const [spentAmountResult, noOfOrdersResult, noOfOrdersCanceledResult] =
      await Promise.all([
        prisma.order.aggregate({
          _sum: {
            amount: true,
          },
          where: {
            userId: user.id,
          },
        }),
        prisma.order.count({
          where: {
            userId: user.id,
          },
        }),
        prisma.order.count({
          where: {
            userId: user.id,
            status: "CANCELLED",
          },
        }),
      ]);
    if (spentAmountResult._sum.amount) {
      data.spentAmount = spentAmountResult._sum.amount ?? 0;
    }
    if (noOfOrdersResult) {
      data.noOfOrders = noOfOrdersResult ?? 0;
    }
    if (noOfOrdersCanceledResult) {
      data.noOfOrdersCanceled = noOfOrdersCanceledResult ?? 0;
    }
    return data;
  } catch (e: unknown) {
    console.log("error in getUserStats", e);
    return {
      spentAmount: 0,
      noOfOrders: 0,
      noOfOrdersCanceled: 0,
    };
  }
}
