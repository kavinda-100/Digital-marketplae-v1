"use client";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  cancelOrder,
  getSellerOrderByOrderId,
  undoCancelOrder,
} from "../../../../../actions/sellerDashboardActions";
import PriceTag from "../../../../../components/PriceTag";
import { Separator } from "../../../../../components/ui/separator";
import {
  cn,
  formatCurrency,
  formatDate,
  randomLetter,
} from "../../../../../lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const OrderDetailsPage = ({ orderId }: { orderId: string }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = React.useState(false);
  const [cancellationReason, setCancellationReason] = React.useState("");
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      orderId,
      cancellationReason,
    }: {
      orderId: string;
      cancellationReason: string;
    }) => cancelOrder({ orderId, cancellationReason }),
    onError: (error) => {
      toast.error(error.message ?? "An error occurred");
      setIsDialogOpen(false);
    },
    onSuccess: () => {
      setIsDialogOpen(false);
      toast.success("Order cancelled successfully");
      window.location.reload();
    },
  });

  async function handleCancelOrder(id: string) {
    if (!cancellationReason) {
      setCancellationReason("No reason");
    }
    mutate({ orderId: id, cancellationReason });
  }

  const { mutate: undoCancelOrderMutation, isPending: isUndoPending } =
    useMutation({
      mutationFn: async ({ id }: { id: string }) => undoCancelOrder({ id }),
      onError: (error) => {
        toast.error(error.message ?? "An error occurred");
        setIsSecondDialogOpen(false);
      },
      onSuccess: () => {
        setIsSecondDialogOpen(false);
        toast.success("Order uncancelled successfully");
        window.location.reload();
      },
    });

  async function handleUndoCancelOrder(id: string) {
    undoCancelOrderMutation({ id });
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["sellerOrder", orderId],
    queryFn: () => getSellerOrderByOrderId(orderId),
  });
  if (isLoading) {
    return (
      <div className={"grid grid-cols-3 gap-3"}>
        <div className={"col-span-3 lg:col-span-2"}>
          <Skeleton className={"h-[200px] w-full lg:h-[500px]"} />
        </div>
        <div className={"col-span-3 lg:col-span-1"}>
          <Skeleton className={"mb-3 h-[100px] w-full"} />
          <Skeleton className={"h-[100px] w-full"} />
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>Order not found</div>;
  }
  return (
    <div className={"w-full"}>
      <div className={"grid grid-cols-3 gap-3"}>
        <div className={"col-span-3 lg:col-span-2"}>
          {/* product details */}
          <h1 className={"my-3 text-2xl font-bold"}>{data.product.name}</h1>
          <div className={"flex flex-wrap gap-3"}>
            {data.product.thumbnail && (
              <>
                {data.product.thumbnail.map((thumbnail) => {
                  return (
                    <img
                      key={thumbnail.url}
                      src={thumbnail.url}
                      alt={data.product.name}
                      className={
                        "h-24 w-24 rounded-md object-cover lg:h-32 lg:w-32"
                      }
                    />
                  );
                })}
              </>
            )}
          </div>
          <div
            className={"my-3 flex flex-col justify-between gap-3 lg:flex-row"}
          >
            <h3
              className={
                "text-md line-clamp-1 font-medium text-muted-foreground"
              }
            >
              {data.product.shortDescription}
            </h3>
            <PriceTag price={data.product.price ?? 0} />
          </div>
          <Separator />
          {/* order details */}
          <div className={"my-3 flex w-full flex-col gap-2"}>
            <div
              className={
                "flex justify-between gap-3 rounded border border-primary/5 bg-muted/30 px-2 py-3 shadow-sm"
              }
            >
              <p className={"font-semibold"}>Order Amount:</p>
              <p>{formatCurrency(data.amount ?? 0)}</p>
            </div>
            <div
              className={
                "flex justify-between gap-3 rounded border border-primary/5 bg-muted/30 px-2 py-3 shadow-sm"
              }
            >
              <p className={"font-semibold"}>Status:</p>
              <div
                className={cn("rounded border p-1 text-center text-xs", {
                  "border-green-500 bg-green-500/10 text-green-600 dark:bg-green-500/20":
                    data.status === "COMPLETED",
                  "border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20":
                    data.status === "CANCELLED",
                  "border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20":
                    data.status === "PENDING",
                })}
              >
                {data.status}
              </div>
            </div>
            <div
              className={
                "flex justify-between gap-3 rounded border border-primary/5 bg-muted/30 px-2 py-3 shadow-sm"
              }
            >
              <p className={"font-semibold"}>Paid:</p>
              <div
                className={cn("rounded border p-1 text-center text-xs", {
                  "border-green-500 bg-green-500/10 text-green-600 dark:bg-green-500/20":
                    data.isPaid === true,
                  "border-red-500 bg-red-500/10 text-red-600 dark:bg-red-500/20":
                    data.isPaid === false,
                })}
              >
                {data.isPaid ? "Yes" : "No"}
              </div>
            </div>
            <div
              className={
                "flex justify-between gap-3 rounded border border-primary/5 bg-muted/30 px-2 py-3 shadow-sm"
              }
            >
              <p className={"font-semibold"}>Date:</p>
              <p>{formatDate(data.createdAt)}</p>
            </div>
          </div>
          <Separator />
          {/* shipping details */}
          <div className={"my-3 flex w-full flex-col gap-2"}>
            <div
              className={
                "flex justify-between gap-3 rounded border border-primary/5 bg-muted/30 px-2 py-3 shadow-sm"
              }
            >
              <p className={"font-semibold"}>Address:</p>
              <p className={"capitalize"}>{data.shippingDetails.address}</p>
            </div>
            <div
              className={
                "flex justify-between gap-3 rounded border border-primary/5 bg-muted/30 px-2 py-3 shadow-sm"
              }
            >
              <p className={"font-semibold"}>City:</p>
              <p className={"capitalize"}>{data.shippingDetails.city}</p>
            </div>
            <div
              className={
                "flex justify-between gap-3 rounded border border-primary/5 bg-muted/30 px-2 py-3 shadow-sm"
              }
            >
              <p className={"font-semibold"}>Country:</p>
              <p className={"capitalize"}>{data.shippingDetails.country}</p>
            </div>
            <div
              className={
                "flex justify-between gap-3 rounded border border-primary/5 bg-muted/30 px-2 py-3 shadow-sm"
              }
            >
              <p className={"font-semibold"}>PostalCode:</p>
              <p>{data.shippingDetails.postalCode}</p>
            </div>
          </div>
          <Separator />
          {/*  action */}
          {data.status != "CANCELLED" && (
            <>
              <div className={"my-3 flex flex-col justify-start gap-3"}>
                <p className={"font-semibold"}>Cancel Order</p>
                <Textarea
                  placeholder={"Add a the reason"}
                  value={cancellationReason}
                  disabled={isPending}
                  onChange={(e) => setCancellationReason(e.target.value)}
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant={"destructive"}
                      disabled={isPending}
                      className={"w-full"}
                    >
                      Cancel Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action will cancel the order
                      </DialogDescription>
                    </DialogHeader>
                    <div className={"flex justify-between gap-3"}>
                      <Button
                        variant={"outline"}
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleCancelOrder(data.id)}
                        disabled={isPending}
                      >
                        {isPending ? "Cancelling..." : "Yes, Cancel Order"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
          {data.status === "CANCELLED" && (
            <div className={"my-3 flex flex-col justify-start gap-3"}>
              <p className={"font-semibold"}>Order Cancelled</p>
              <p className={"text-muted-foreground"}>
                Order was cancelled on{" "}
                <span className={"text-pretty font-bold"}>
                  {formatDate(data.canceledAt ?? new Date())}
                </span>
              </p>
              <p className={"text-muted-foreground"}>
                Reason:{" "}
                <span className={"text-pretty font-bold"}>
                  {data.cancelReason}
                </span>
              </p>
              <Dialog
                open={isSecondDialogOpen}
                onOpenChange={setIsSecondDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button disabled={isUndoPending} className={"w-full"}>
                    Undo Cancel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action will undo the cancel order
                    </DialogDescription>
                  </DialogHeader>
                  <div className={"flex justify-between gap-3"}>
                    <Button
                      variant={"outline"}
                      onClick={() => setIsSecondDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleUndoCancelOrder(data.id)}
                      disabled={isUndoPending}
                    >
                      {isUndoPending
                        ? "Undo Cancelling..."
                        : "Yes, Undo Cancel Order"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <div className={"col-span-3 lg:col-span-1"}>
          {/* seller */}
          <div className={"my-3 rounded bg-muted/30 shadow-sm"}>
            <div className={"p-3"}>
              <h2 className={"mb-2 text-lg font-bold"}>Seller</h2>
              <div className={"flex items-center gap-3"}>
                <Avatar>
                  <AvatarImage
                    src={data.seller.profilePic ?? ""}
                    alt={data.seller.name ?? ""}
                  />
                  <AvatarFallback>
                    {data.seller.name
                      ? data.seller.name.charAt(0).toUpperCase()
                      : randomLetter()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className={"text-pretty font-semibold"}>
                    {data.seller.name}
                  </p>
                  <p className={"text-pretty text-muted-foreground"}>
                    {data.seller.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* buyer */}
          <div className={"my-3 rounded bg-muted/30 shadow-sm"}>
            <div className={"p-3"}>
              <h2 className={"mb-2 text-lg font-bold"}>Buyer</h2>
              <div className={"flex items-center gap-3"}>
                <Avatar>
                  <AvatarImage
                    src={data.buyer.profilePic ?? ""}
                    alt={data.buyer.name ?? ""}
                  />
                  <AvatarFallback>
                    {data.buyer.name
                      ? data.buyer.name.charAt(0).toUpperCase()
                      : randomLetter()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className={"text-pretty font-semibold"}>
                    {data.buyer.name}
                  </p>
                  <p className={"text-pretty text-muted-foreground"}>
                    {data.buyer.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetailsPage;
