import z from "zod";

export const onBoardingSchema = z.object({
  role: z.enum(["USER", "SELLER", "ADMIN"], {
    message: "Role is required and must be either USER or SELLER",
  }),
  city: z.string({ message: "City is required" }),
  state: z.string({ message: "State is required" }),
  country: z.string({ message: "Country is required" }),
  zip: z.string({ message: "Zip is required" }),
});

export type OnBoardingType = z.infer<typeof onBoardingSchema>;
