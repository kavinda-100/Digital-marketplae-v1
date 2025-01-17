import { prisma } from "../server/db";

export async function getSellerCurruntPlan(kindUserId: string) {
  try {
    const paln = await prisma.subscription.findUnique({
      where: {
        kindUserId: kindUserId,
      },
      select: {
        plan: true,
      },
    });
    return paln;
  } catch (e: unknown) {
    console.log("Error in getSellerCurruntPlan", e);
    return null;
  }
}
