"use server";

import { prisma } from "../server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { months } from "../constans";

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

export async function getSellerLineChartData() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const orders = await prisma.order.findMany({
      where: {
        sellerId: user.id,
        status: "COMPLETED",
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    const currentMonthIndex = new Date().getMonth();
    let chartData: exampleChartData[] = [];

    if (currentMonthIndex === 0) {
      //? If the current month is January, include October of the previous year
      const octoberOrders = orders.filter(
        (order) => new Date(order.createdAt).getMonth() === 10, // October
      );
      const octoberSales = octoberOrders.length;
      const octoberRevenue = octoberOrders.reduce(
        (sum, order) => sum + order.amount,
        0,
      );

      chartData.push({
        month: "October",
        sales:
          process.env.NODE_ENV === "development"
            ? octoberSales + 500
            : octoberSales,
        revenue:
          process.env.NODE_ENV === "development"
            ? octoberRevenue + 15000
            : octoberRevenue,
      });

      //? If the current month is January, include December of the previous year
      const decemberOrders = orders.filter(
        (order) => new Date(order.createdAt).getMonth() === 11, // December
      );
      const decemberSales = decemberOrders.length;
      const decemberRevenue = decemberOrders.reduce(
        (sum, order) => sum + order.amount,
        0,
      );

      chartData.push({
        month: "December",
        sales:
          process.env.NODE_ENV === "development"
            ? decemberSales + 800
            : decemberSales,
        revenue:
          process.env.NODE_ENV === "development"
            ? decemberRevenue + 19000
            : decemberRevenue,
      });
    }

    //? Include months from January to the current month
    chartData = chartData.concat(
      months.slice(0, currentMonthIndex + 1).map((month, index) => {
        const monthlyOrders = orders.filter(
          (order) => new Date(order.createdAt).getMonth() === index,
        );
        const sales = monthlyOrders.length;
        const revenue = monthlyOrders.reduce(
          (sum, order) => sum + order.amount,
          0,
        );

        return {
          month,
          sales,
          revenue,
        };
      }),
    );

    return chartData;
  } catch (e: unknown) {
    console.log("Error in getSellerLineChartData", e);
    throw new Error("Internal Server Error");
  }
}

export async function getSellerResentOrders() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    return await prisma.order.findMany({
      where: {
        sellerId: user.id,
        status: "COMPLETED",
      },
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        amount: true,
        status: true,
        product: {
          select: {
            name: true,
            thumbnail: {
              select: {
                url: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });
  } catch (e: unknown) {
    console.log("Error in getSellerResentOrders", e);
    throw new Error("Internal Server Error");
  }
}

export async function getSellerOrders() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    return await prisma.order.findMany({
      where: {
        sellerId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        amount: true,
        status: true,
        isPaid: true,
        product: {
          select: {
            name: true,
            thumbnail: {
              select: {
                url: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });
  } catch (e: unknown) {
    console.log("Error in getSellerOrders", e);
    throw new Error("Internal Server Error");
  }
}
