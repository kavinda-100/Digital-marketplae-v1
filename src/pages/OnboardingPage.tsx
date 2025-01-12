"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import SubmitButton from "../components/SubmitButton";
import { crateOnBoarding } from "../apiFile/onBoarding";
import { toast } from "sonner";
import { onBoardingSchema } from "../zod/onBoarding";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const OnboardingPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof onBoardingSchema>>({
    resolver: zodResolver(onBoardingSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof onBoardingSchema>) =>
      crateOnBoarding(data),
    onError: (error) => {
      toast.error(error?.message || "Error occurred when submitting the form");
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success(data?.message || "onBoarding is successfully created");
      router.push("/");
    },
  });

  function onSubmit(values: z.infer<typeof onBoardingSchema>) {
    console.log(values);
    mutate(values);
  }
  return (
    <Card className={"mx-auto max-w-5xl"}>
      <CardHeader>
        <CardTitle className={"text-lg lg:text-xl"}>You Almost There</CardTitle>
        <CardDescription>
          Please provide below details to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Would you like to be</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="SELLER">Seller</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>please select your role</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="london" {...field} />
                  </FormControl>
                  <FormDescription>Please provide your city</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="central" {...field} />
                  </FormControl>
                  <FormDescription>Please provide your state</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="England" {...field} />
                  </FormControl>
                  <FormDescription>Please provide your country</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="20000" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please provide your zip code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              loading={isPending}
              disabled={isPending}
              text={"submit"}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default OnboardingPage;
