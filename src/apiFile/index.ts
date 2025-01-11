import axios from "axios";
import { prisma } from "@/server/db";

export const Api = axios.create({
  baseURL: "/api",
});
export const handleAxiosError = (error: unknown): Error => {
  if (axios.isAxiosError(error) && error.response?.data?.error) {
    throw new Error(error.response.data.error);
  } else if (axios.isAxiosError(error) && error.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else {
    throw new Error("An unexpected error occurred");
  }
};

export const getUserBuId = async ({ userId }: { userId: string | null }) => {
  if (userId) {
    return prisma.onBoarding.findUnique({
      where: {
        kindUserId: userId,
      },
      select: {
        role: true,
      },
    });
  }
  return null;
};
