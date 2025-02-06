"use server";

import { prisma } from "../server/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

type OnBoarding = {
  data: {
    city: string;
    country: string;
    state: string;
    zip: string;
  };
};
export async function updateOnBoarding({ data }: OnBoarding) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    if (!data.city || !data.country || !data.state || !data.zip) {
      throw new Error("Please fill all fields");
    }
    const onBoarding = await prisma.onBoarding.findFirst({
      where: {
        kindUserId: user.id,
      },
    });
    if (!onBoarding) {
      await prisma.onBoarding.create({
        data: {
          kindUserId: user.id,
          zip: data.zip,
          state: data.state,
          country: data.country,
          city: data.city,
        },
      });
    } else {
      await prisma.onBoarding.update({
        where: {
          id: onBoarding.id,
        },
        data: {
          zip: data.zip,
          state: data.state,
          country: data.country,
          city: data.city,
        },
      });
    }
    revalidatePath("/profile");
    revalidatePath("/");
  } catch (e: unknown) {
    console.log("Error while updating onboarding", e);
    throw new Error("Internal server error");
  }
}

export async function deleteAccount() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      throw new Error("Unauthorized");
    }
    await Promise.all([
      prisma.onBoarding.deleteMany({
        where: {
          kindUserId: user.id,
        },
      }),
      prisma.user.delete({
        where: {
          id: user.id,
        },
      }),
      prisma.subscription.deleteMany({
        where: {
          kindUserId: user.id,
        },
      }),
    ]);
    revalidatePath("/");
  } catch (e: unknown) {
    console.log("Error while deleting account", e);
    throw new Error("Internal server error");
  }
}
