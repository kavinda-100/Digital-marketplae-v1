"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../server/db";

export async function getAdminStats() {
  try {
    const data = {
      revenue: 0,
      noOfUsers: 0,
      noOfSellers: 0,
      noOfProducts: 0,
      noOfOrders: 0,
      noOfSubscriptions: 0,
    };

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      console.log("User not found in getAdminStats - unAuthorized");
      return data;
    }

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
    return {
      revenue: 0,
      noOfUsers: 0,
      noOfSellers: 0,
      noOfProducts: 0,
      noOfOrders: 0,
      noOfSubscriptions: 0,
    };
  }
}

export async function getAllProducts() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("UnAuthorized");
    }
    const data = await prisma.product.findMany({
      select: {
        id: true,
        sellerId: true,
        name: true,
        shortDescription: true,
        price: true,
        productType: true,
        thumbnail: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // formatting the data
    return data.map((product) => {
      return {
        ...product,
        thumbnail: product.thumbnail.map((image) => image.url)[0],
        createdAt: product.createdAt.toString(),
      };
    });
  } catch (e: unknown) {
    console.log("Error in getAllProducts - admin", e);
    throw new Error("Internal Server Error");
  }
}

export async function getAllOrders() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("UnAuthorized");
    }
    const data = await prisma.order.findMany({
      select: {
        id: true,
        amount: true,
        status: true,
        isPaid: true,
        createdAt: true,
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // formatting the data
    return data.map((order) => {
      return {
        ...order,
        productName: order.product.name,
        thumbnail: order.product.thumbnail.map((image) => image.url)[0],
        createdAt: order.createdAt.toString(),
      };
    });
  } catch (e: unknown) {
    console.log("Error in getAllOrders - admin", e);
    throw new Error("Internal Server Error");
  }
}

export async function getAllUsers() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("UnAuthorized");
    }
    const data = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profilePic: true,
        onBoarding: {
          select: {
            role: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // formatting the data
    return data.map((user) => {
      return {
        ...user,
        name: user.name ?? "N/A",
        role: user.onBoarding?.role,
        createdAt: user.createdAt.toString(),
      };
    });
  } catch (e: unknown) {
    console.log("Error in getAllUsers - admin", e);
    throw new Error("Internal Server Error");
  }
}

export async function getRevenueChartData() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("UnAuthorized");
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const orders = await prisma.order.groupBy({
      by: ["createdAt"],
      _sum: {
        amount: true,
      },
      _count: {
        _all: true,
      },
    });

    const chartData: { month: string; revenue: number; orders: number }[] =
      months.map((month) => ({
        month,
        revenue: 0,
        orders: 0,
      }));

    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      const monthName = months[month];
      const index = chartData.findIndex((data) => data.month === monthName);
      if (index !== -1 && order._sum && order._count && chartData[index]) {
        chartData[index].revenue += order._sum.amount ?? 0;
        chartData[index].orders += order._count._all ?? 0;
      }
    });

    // console.log(chartData);
    return chartData;
  } catch (e: unknown) {
    console.log("Error in getRevenueChartData", e);
    throw new Error("Internal Server Error");
  }
}

export async function getAllUsersChartData() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("UnAuthorized");
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const users = await prisma.user.groupBy({
      by: ["createdAt"],
      _count: {
        _all: true,
      },
    });

    const chartData: { month: string; users: number }[] = months.map(
      (month) => ({
        month,
        users: 0,
      }),
    );

    users.forEach((user) => {
      const month = new Date(user.createdAt).getMonth();
      const monthName = months[month];
      const index = chartData.findIndex((data) => data.month === monthName);
      if (index !== -1 && user._count && chartData[index]) {
        chartData[index].users += user._count._all ?? 0;
      }
    });

    // console.log(chartData);
    return chartData;
  } catch (e: unknown) {
    console.log("Error in getAllUsersChartData", e);
    throw new Error("Internal Server Error");
  }
}
