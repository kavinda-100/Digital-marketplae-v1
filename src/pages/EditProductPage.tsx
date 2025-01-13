"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ProductSchema } from "../zod/seller";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { editProduct } from "../apiFile/product";
import { toast } from "sonner";
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
import ProductType from "@/components/ProductType";
import TipTapEditor from "@/TipTapEditer/TipTapEditor";
import { UploadDropzone } from "@/lib/uploadthing";
import SubmitButton from "@/components/SubmitButton";
import { Textarea } from "@/components/ui/textarea";

const EditProductPage = ({
  id,
  name,
  price,
  shortDescription,
  longDescription,
  thumbnail,
  productType,
  productUrl,
}: SingleProductPageProps) => {
  const [productTypes, setProductType] = React.useState<
    "ICONS" | "UIKITS" | "TEMPLATES"
  >(productType);
  const [editorValue, setEditorValue] = React.useState<string>(longDescription);
  const router = useRouter();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: name,
      shortDescription: shortDescription,
      longDescription: longDescription,
      price: price.toString(),
      productType: productType,
      thumbnailUrls: thumbnail,
      productUrl: productUrl ?? undefined,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof ProductSchema>) =>
      editProduct({ id, data }),
    onSuccess: () => {
      toast.success("Product updated successfully");
      router.push("/dashboard/seller/product");
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred");
    },
  });

  function onSubmit(values: z.infer<typeof ProductSchema>) {
    const price = Number(values.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Price must be a positive number");
      return;
    }
    values.price = price.toString();
    console.log(values);
    mutate(values);
  }

  React.useEffect(() => {
    form.setValue("longDescription", editorValue || "");
    // console.log(editorValue);
  }, [editorValue, form]);

  React.useEffect(() => {
    form.setValue("productType", productTypes);
  }, [productTypes, form]);

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
        <CardTitle>Edit Your Product</CardTitle>
        <CardDescription>
          Fill out the form below to Edit your product
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
                productType={productTypes}
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
                    toast.error(`ERROR! ${error.message}`);
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
              text={"Edit Product"}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default EditProductPage;
