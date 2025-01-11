import z from "zod";

export const stripeSchema = z.object({
  type: z.enum(["basic", "pro", "enterprise"], { message: "Invalid type" }),
});
