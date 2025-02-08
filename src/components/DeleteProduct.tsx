"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { DeleteProductAction } from "../actions/prodcutActions";

const DeleteProduct = ({ productId }: { productId: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(`DeleteProduct: ${productId}`);

  // const { mutate, isPending } = useMutation({
  //   mutationFn: async (Id: string) => deleteProduct(Id),
  //   onSuccess: () => {
  //     toast.success("Product deleted");
  //     setIsOpen(false);
  //   },
  //   onError: (error) => {
  //     toast.error(error?.message || "An error occurred");
  //     setIsOpen(false);
  //   },
  // });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => DeleteProductAction({ id: productId }),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        setIsOpen(false);
      }
      if (!res.success) {
        toast.error(res.message);
        setIsOpen(false);
      }
    },
    onError: (error) => {
      toast.error(
        error?.message || "An error occurred while deleting the product",
      );
      setIsOpen(false);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"}>
          <Trash2 className={"size-2"} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product.
          </DialogDescription>
        </DialogHeader>
        <div className={"flex w-full justify-end gap-2"}>
          <Button variant={"secondary"} onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => mutate()}
            disabled={isPending}
          >
            {isPending ? (
              <p className={"flex items-center justify-center gap-2"}>
                <Loader2 className={"size-3 animate-spin"} /> Deleting...
              </p>
            ) : (
              <p>Delete</p>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteProduct;
