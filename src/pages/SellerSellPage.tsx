"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ProductSchema } from "../zod/seller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/apiFile/sell";
import { toast } from "sonner";
import type { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TipTapEditor from "@/TipTapEditer/TipTapEditor";
import { UploadDropzone } from "@/lib/uploadthing";
import SubmitButton from "@/components/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import ProductType from "@/components/ProductType";

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

  return (
    <Card className={"container mx-auto p-2"}>
      <CardHeader>
        <CardTitle>Sell Your Product</CardTitle>
        <CardDescription>
          Fill out the form below to sell your product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Fabby Template" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your name for the product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={"my-3 flex flex-col gap-3"}>
              <Label>Product Type</Label>
              <ProductType
                productType={productType}
                setProductType={setProductType}
              />
              <p className={"text-[0.8rem] font-light text-muted-foreground"}>
                Select the type of product you are selling.
              </p>
              {form.formState.errors.productType && (
                <p className={"text-sm text-red-500"}>
                  {form.formState.errors.productType.message}
                </p>
              )}
            </div>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="$55" {...field} />
                  </FormControl>
                  <FormDescription>
                    write the price of your product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="write somthing here..." {...field} />
                  </FormControl>
                  <FormDescription>
                    write a short description for your product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={"flex flex-col gap-3"}>
              <Label>Product Description</Label>
              <TipTapEditor content={editorValue} setContent={setEditorValue} />
              <p className={"text-[0.8rem] font-light text-muted-foreground"}>
                Write a detailed description of your product
              </p>
              {form.formState.errors.longDescription && (
                <p className={"text-sm text-red-500"}>
                  {form.formState.errors.longDescription.message}
                </p>
              )}
            </div>
            <div className={"flex w-full flex-col gap-3"}>
              <Label>Upload Thumbnails</Label>
              <div className="w-full">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Image Upload Files: ", res);
                    toast.success("Image uploaded successfully");
                    const urls = res.map((file) => ({
                      url: file.url,
                      key: file.key,
                    }));
                    form.setValue("thumbnailUrls", urls);
                  }}
                  onUploadError={(error: Error) => {
                    console.log("Image Upload Error: ", error);
                    toast.error(`Image Upload ERROR! ${error.message}`);
                  }}
                />
              </div>
              <p className={"text-[0.8rem] font-light text-muted-foreground"}>
                You can upload up to 4 images
              </p>
              {form.formState.errors.thumbnailUrls && (
                <p className={"text-sm text-red-500"}>
                  {form.formState.errors.thumbnailUrls.message}
                </p>
              )}
            </div>
            {/*<div className={"flex w-full flex-col gap-3"}>*/}
            {/*  <Label>Upload zip file</Label>*/}
            {/*  <div className="w-full">*/}
            {/*    <UploadDropzone*/}
            {/*      endpoint="zipUploader"*/}
            {/*      onClientUploadComplete={(res) => {*/}
            {/*        console.log("zip Upload Files: ", res);*/}
            {/*        toast.success("Zip file uploaded successfully");*/}
            {/*        if (res.length > 0) {*/}
            {/*          form.setValue("productUrl", res[0]?.url ?? "");*/}
            {/*        }*/}
            {/*      }}*/}
            {/*      onUploadError={(error: Error) => {*/}
            {/*        console.log("zip Upload Error: ", error);*/}
            {/*        toast.error(`Zip file uploaded ERROR! ${error.message}`);*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*  <p className={"text-[0.8rem] font-light text-muted-foreground"}>*/}
            {/*    You can upload zip file (max size 128MB) (only one file)*/}
            {/*  </p>*/}
            {/*  {form.formState.errors.productUrl && (*/}
            {/*    <p className={"text-sm text-red-500"}>*/}
            {/*      {form.formState.errors.productUrl.message}*/}
            {/*    </p>*/}
            {/*  )}*/}
            {/*</div>*/}
            <FormField
              control={form.control}
              name="productUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/your-repo"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Add a link to your product</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              loading={isPending}
              disabled={isPending}
              text={"Create Product"}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default SellerSellPage;
