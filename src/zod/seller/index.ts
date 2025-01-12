import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string({ message: "Name is required" }),
  shortDescription: z.string({ message: "Short description is required" }),
  longDescription: z.string({ message: "Long description is required" }),
  price: z.string({ message: "Price is required" }),
  productType: z.enum(["TEMPLATES", "UIKITS", "ICONS"], {
    message: "Invalid product type",
  }),
  thumbnailUrls: z.array(
    z.object({
      url: z.string().url({ message: "Invalid URL" }),
      key: z.string(),
    }),
  ),
  productUrl: z.string().url({ message: "Invalid URL" }),
});
