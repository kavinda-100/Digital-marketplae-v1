"use server";

import { prisma } from "../server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { months } from "../constans";

export async function getSellerStats() {
  try {
    const data = {
      revenue: 0,
      noOfProducts: 0,
      noOfOrders: 0,
    };

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      console.log("user not found in getSellerStats - unAuthorized");
      return data;
    }

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
    return {
      revenue: 0,
      noOfProducts: 0,
      noOfOrders: 0,
    };
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
      take: 3,
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
    const result = await prisma.order.findMany({
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
    // format the data
    return result.map((order) => {
      return {
        id: order.id,
        amount: order.amount,
        status: order.status,
        isPaid: order.isPaid,
        productName: order.product.name,
        productThumbnail: order.product.thumbnail.map((t) => t.url)[0],
        createdAt: order.createdAt,
      };
    });
  } catch (e: unknown) {
    console.log("Error in getSellerOrders", e);
    throw new Error("Internal Server Error");
  }
}

export async function getSellerOrderByOrderId(id: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    // get the order and shipping details
    const result = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        amount: true,
        status: true,
        isPaid: true,
        createdAt: true,
        shippingDetails: true,
        productId: true,
        userId: true,
        sellerId: true,
        cancelReason: true,
        canceledAt: true,
      },
    });
    if (!result) {
      throw new Error("Order not found");
    }
    // get the product details
    const product = await prisma.product.findUnique({
      where: {
        id: result.productId,
      },
      select: {
        name: true,
        shortDescription: true,
        price: true,
        thumbnail: {
          select: {
            url: true,
          },
        },
      },
    });
    // get the user details
    const buyer = await prisma.user.findUnique({
      where: {
        kindUserId: result.userId,
      },
      select: {
        name: true,
        email: true,
        profilePic: true,
      },
    });
    // get the seller details
    const seller = await prisma.user.findUnique({
      where: {
        kindUserId: result.sellerId,
      },
      select: {
        name: true,
        email: true,
        profilePic: true,
      },
    });
    // format the data
    return {
      id: result.id,
      amount: result.amount,
      status: result.status,
      isPaid: result.isPaid,
      cancelReason: result.cancelReason,
      canceledAt: result.canceledAt,
      createdAt: result.createdAt,
      shippingDetails: {
        address: result.shippingDetails?.address,
        city: result.shippingDetails?.city,
        country: result.shippingDetails?.country,
        postalCode: result.shippingDetails?.postalCode,
      },
      product: {
        name: product?.name,
        shortDescription: product?.shortDescription,
        price: product?.price,
        thumbnail: product?.thumbnail,
      },
      buyer: {
        name: buyer?.name,
        email: buyer?.email,
        profilePic: buyer?.profilePic,
      },
      seller: {
        name: seller?.name,
        email: seller?.email,
        profilePic: seller?.profilePic,
      },
    };
  } catch (e: unknown) {
    console.log("Error in getSellerOrderByOrderId", e);
    throw new Error("Internal Server Error");
  }
}

export async function cancelOrder({
  orderId,
  cancellationReason,
}: {
  orderId: string;
  cancellationReason: string;
}) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      select: {
        status: true,
      },
    });
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status === "CANCELLED") {
      throw new Error("Order is already cancelled");
    }
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELLED",
        cancelReason: cancellationReason,
        canceledAt: new Date(),
      },
    });

    revalidatePath("/seller/orders");
    revalidatePath(`/seller/orders/${orderId}`);
    return {
      message: "Order cancelled successfully",
    };
  } catch (e: unknown) {
    console.log("Error in cancelOrder", e);
    throw new Error("Internal Server Error");
  }
}

export async function undoCancelOrder({ id }: { id: string }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      select: {
        status: true,
      },
    });
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status !== "CANCELLED") {
      throw new Error("Order is not cancelled");
    }
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: "COMPLETED",
        cancelReason: null,
        canceledAt: null,
      },
    });

    revalidatePath("/seller/orders");
    revalidatePath(`/seller/orders/${id}`);
    return {
      message: "Order cancellation undone successfully",
    };
  } catch (e: unknown) {
    console.log("Error in undoCancelOrder", e);
    throw new Error("Internal Server Error");
  }
}
