import type { z } from "zod";
import type { onBoardingSchema } from "../zod/onBoarding";
import { Api, handleAxiosError } from "./index";
import { prisma } from "@/server/db";

//* prisma request for onboarding

export const checkIsFinishedOnBoarding = async (kindUserId: string) => {
  const data = await prisma.onBoarding.findUnique({
    where: {
      kindUserId: kindUserId,
    },
    select: {
      role: true,
    },
  });
  return data;
};

//* axios request for onboarding
export async function crateOnBoarding(data: z.infer<typeof onBoardingSchema>) {
  try {
    const response = await Api.post("/onboarding", data);
    return response.data;
  } catch (e) {
    handleAxiosError(e);
  }
}
