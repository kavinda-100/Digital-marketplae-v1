"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFullOrderDetails } from "../../../../../actions/adminDashboardActions";
import { Skeleton } from "../../../../../components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../../components/ui/carousel";
import Image from "next/image";
import PriceTag from "../../../../../components/PriceTag";
import { formatDate } from "../../../../../lib/utils";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

type ViewFullOrderProps = {
  id: string;
};

const ViewFullOrder = ({ id }: ViewFullOrderProps) => {
  const [copyUserId, setCopyUserId] = React.useState(false);
  const [copyOrderId, setCopyOrderId] = React.useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["fullOrder", id],
    queryFn: () => getFullOrderDetails(id),
  });
  if (isLoading) {
    return (
      <div className={"container mx-auto"}>
        <Skeleton className={"h-[200px] w-full p-2 lg:h-[500px]"} />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return (
      <div className={"flex h-full w-full items-center justify-center"}>
        <p
          className={"text-center text-sm font-semibold text-muted-foreground"}
        >
          Product not found
        </p>
      </div>
    );
  }
  console.log(data);
  return (
    <div className={"w-full p-2"}>
      {/* product details */}
      <div className={"grid grid-cols-2 gap-4"}>
        <div className={"col-span-2 grid lg:col-span-1"}>
          <div className={"w-full"}>
            <Carousel className={"mx-auto w-full"}>
              <CarouselContent>
                {data.product?.thumbnail?.map((thumbnail, index) => (
                  <CarouselItem key={index}>
                    <div className={"relative h-[250px] w-full lg:h-[400px]"}>
                      <Image
                        src={thumbnail}
                        alt={`${thumbnail}-${index}`}
                        className={"h-full w-full rounded object-contain"}
                        fill
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className={"ml-14"} />
              <CarouselNext className={"mr-14"} />
            </Carousel>
          </div>
        </div>
        <div className={"col-span-2 grid lg:col-span-1"}>
          <div className={"flex w-full flex-col gap-4"}>
            <h1 className={"text-2xl font-semibold lg:mt-5"}>
              {data.product?.name}
            </h1>
            <p className={"text-pretty text-lg text-muted-foreground"}>
              {data.product?.shortDescription}
            </p>
            <PriceTag price={data.product?.price ?? 0} />
            <span className={"flex justify-between gap-2"}>
              <p>
                <span className={"font-semibold text-muted-foreground"}>
                  Product Type:
                </span>{" "}
                {data.product?.productType}
              </p>
              <p>
                <span className={"font-semibold text-muted-foreground"}>
                  Created At:
                </span>{" "}
                {formatDate(new Date(data.product?.createdAt))}
              </p>
            </span>
          </div>
        </div>
      </div>
      {/* order details*/}
      <div className={"mt-4 grid grid-cols-2 gap-8"}>
        <div className={"col-span-2 grid lg:col-span-1"}>
          <div className={"flex w-full flex-col gap-4"}>
            <h1 className={"text-2xl font-semibold lg:mt-5"}>Order Details</h1>
            <div className={"flex justify-between gap-2"}>
              <div className={"flex justify-center gap-3"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Order ID:
                </span>
                <span
                  className={
                    "flex items-center justify-center gap-3 font-bold text-muted-foreground/50"
                  }
                >
                  {data.id.slice(0, 20)}...
                  {!copyOrderId ? (
                    <Copy
                      className={"size-4 cursor-pointer text-primary"}
                      onClick={async () => {
                        await navigator.clipboard.writeText(data.id);
                        setCopyOrderId(true);
                        toast("Order ID copied to clipboard");
                        setTimeout(() => {
                          setCopyOrderId(false);
                        }, 2000);
                      }}
                    />
                  ) : (
                    <Check className={"size-4 cursor-pointer text-primary"} />
                  )}
                </span>
              </div>
              <div className={"flex justify-center gap-3"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Amount:
                </span>
                <PriceTag price={data.amount} />
              </div>
            </div>
            <div className={"flex justify-between gap-2"}>
              <div className={"flex items-center justify-center gap-3"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Status:
                </span>{" "}
                <span
                  className={
                    "rounded-md border border-primary bg-primary/10 p-0.5 capitalize text-primary"
                  }
                >
                  {data.status.toLowerCase()}
                </span>
              </div>
              <div className={"flex items-center justify-center gap-3"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Paid:
                </span>{" "}
                <span
                  className={
                    "rounded-md border border-primary bg-primary/10 p-0.5 capitalize text-primary"
                  }
                >
                  {data.isPaid ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className={"flex justify-between gap-2"}>
              <div className={"flex items-center justify-center gap-3"}>
                <span className={"font-semibold text-muted-foreground"}>
                  User ID:
                </span>{" "}
                <span
                  className={
                    "flex items-center justify-center gap-3 font-bold text-muted-foreground/50"
                  }
                >
                  {data.userId.slice(0, 10)}...
                  {!copyUserId ? (
                    <Copy
                      className={"size-4 cursor-pointer text-primary"}
                      onClick={async () => {
                        await navigator.clipboard.writeText(data.userId);
                        setCopyUserId(true);
                        toast("User ID copied to clipboard");
                        setTimeout(() => {
                          setCopyUserId(false);
                        }, 2000);
                      }}
                    />
                  ) : (
                    <Check className={"size-4 cursor-pointer text-primary"} />
                  )}
                </span>
              </div>
              <div className={"flex items-center justify-center gap-3"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Created At:
                </span>{" "}
                {formatDate(new Date(data.createdAt))}
              </div>
            </div>
            <div className={"flex flex-col gap-2"}>
              <div className={"flex gap-3"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Canceled At:
                </span>{" "}
                {data?.canceledAt && formatDate(new Date(data?.canceledAt))}
              </div>
              <div className={"flex gap-3"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Cancel Reason:
                </span>{" "}
                {data.cancelReason}
              </div>
            </div>
          </div>
        </div>
        <div className={"col-span-2 grid lg:col-span-1"}>
          <div className={"flex w-full flex-col gap-4"}>
            <h1 className={"text-2xl font-semibold lg:mt-5"}>
              Shipping Details
            </h1>
            <div className={"flex justify-between gap-2"}>
              <div className={"flex gap-2"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Address:
                </span>{" "}
                <span className={"capitalize"}>
                  {data.shippingDetails?.address}
                </span>
              </div>
              <div className={"flex gap-2"}>
                <span className={"font-semibold text-muted-foreground"}>
                  City:
                </span>{" "}
                <span className={"capitalize"}>
                  {data.shippingDetails?.city}
                </span>
              </div>
            </div>
            <div className={"flex justify-between gap-2"}>
              <div className={"flex gap-2"}>
                <span className={"font-semibold text-muted-foreground"}>
                  State:
                </span>{" "}
                <span className={"capitalize"}>
                  {data.shippingDetails?.state}
                </span>
              </div>
              <div className={"flex gap-2"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Country:
                </span>{" "}
                <span className={"capitalize"}>
                  {data.shippingDetails?.country}
                </span>
              </div>
            </div>
            <div className={"flex justify-between gap-2"}>
              <div className={"flex gap-2"}>
                <span className={"font-semibold text-muted-foreground"}>
                  Postal Code:
                </span>{" "}
                <span className={"capitalize"}>
                  {data.shippingDetails?.postalCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewFullOrder;
