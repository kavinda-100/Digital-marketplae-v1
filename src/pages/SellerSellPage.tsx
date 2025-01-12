"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ProductSchema } from "../zod/seller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/apiFile/sell";
import { toast } from "sonner";
import type { z } from "zod";

const SellerSellPage = () => {
  const [productType, setProductType] = React.useState<
    "ICONS" | "UIKITS" | "TEMPLATES"
  >("TEMPLATES");
  const [editorValue, setEditorValue] = React.useState<string>();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: undefined,
      shortDescription: undefined,
      longDescription: undefined,
      price: undefined,
      productType: "TEMPLATES",
      thumbnailUrls: [],
      productUrl: undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (product: z.infer<typeof ProductSchema>) =>
      createProduct(product),
    onSuccess: (data) => {
      toast.success(data.message || "Product created");
      window.location.href = "/dashboard/seller/product";
    },
    onError: (error) => {
      console.log("Error creating product: ", error);
      toast.error(error.message || "Error creating product");
    },
  });

  function onSubmit(values: z.infer<typeof ProductSchema>) {
    const price = Number(values.price);
    if (isNaN(price) || price <= 0) {
      alert("Price must be a positive number");
      return;
    }
    values.price = price.toString();
    console.log(values);
    mutate(values);
  }

  React.useEffect(() => {
    form.setValue("longDescription", editorValue ?? "");
    console.log(editorValue);
  }, [editorValue, form]);

  React.useEffect(() => {
    form.setValue("productType", productType);
  }, [productType, form]);

  const watchShortDescription = form.watch("shortDescription");
  React.useEffect(() => {
    if (watchShortDescription === undefined) return;
    // * check if the short description is at least 15 words
    if (watchShortDescription.split(" ").length < 15) {
      form.setError("shortDescription", {
        type: "manual",
        message: "Short description must be at least 15 words",
      });
    } else {
      form.clearErrors("shortDescription");
    }
  }, [form, watchShortDescription]);

  return <div>SellerSellPage</div>;
};
export default SellerSellPage;
