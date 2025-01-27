"use client";

import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { CreateStripeCheckOutSession } from "../actions/stripeAction";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CheckOutButton = ({
  productId,
  sellerId,
  price,
}: {
  productId: string;
  sellerId: string;
  price: number;
}) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      CreateStripeCheckOutSession({ productId, sellerId, price }),
    onSuccess: (data) => {
      if (data.url) {
        toast.success("Redirecting to checkout page");
        router.push(data.url);
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });
  return (
    <Button className={"w-full"} disabled={isPending} onClick={() => mutate()}>
      {isPending ? (
        <p className={"flex items-center justify-center gap-3"}>
          <Loader2 className={"size-3 animate-spin"} /> please wait...
        </p>
      ) : (
        "Check Out"
      )}
    </Button>
  );
};
export default CheckOutButton;
