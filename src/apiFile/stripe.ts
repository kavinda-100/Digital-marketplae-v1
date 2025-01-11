import { Api, handleAxiosError } from "./index";

export const buyNewPlan = async (type: "basic" | "pro" | "enterprise") => {
  try {
    const res = await Api.post("/stripe/auth", { type });
    return res.data;
  } catch (e: unknown) {
    handleAxiosError(e);
  }
};
