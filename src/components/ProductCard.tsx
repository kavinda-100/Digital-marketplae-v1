import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "../lib/utils";
import { Pencil } from "lucide-react";
import DeleteProduct from "./DeleteProduct";

type ProductCardProps = {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  thumbnail: {
    url: string;
    key: string;
  }[];
  isOwner?: boolean;
};
const ProductCard = ({
  id,
  price,
  thumbnail,
  shortDescription,
  name,
  isOwner,
}: ProductCardProps) => {
  console.log(`ProductCard: ${id} - ${name}`);
  return (
    <div className={"w-full min-w-[280px] rounded-lg shadow-sm"}>
      <div
        className={"flex flex-col items-center justify-between gap-1 px-2 py-1"}
      >
        <Carousel className={"mx-auto w-full"}>
          <CarouselContent>
            {thumbnail.map((thumbnail, index) => (
              <CarouselItem key={index}>
                <div className={"relative h-[230px]"}>
                  <Image
                    src={thumbnail.url}
                    alt={`${thumbnail.url}-${index}`}
                    className={"h-full w-full rounded object-cover"}
                    fill
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={"ml-14"} />
          <CarouselNext className={"mr-14"} />
        </Carousel>
        <div className={"flex flex-col gap-3 p-2"}>
          <div className={"flex items-center justify-between"}>
            <p
              className={
                "text-md line-clamp-1 font-sans font-semibold capitalize"
              }
            >
              {name.trim()}
            </p>
            <p
              className={
                "inline-flex items-center rounded-md bg-primary/10 px-2 py-1 font-mono text-xs font-bold text-primary ring-1 ring-inset ring-primary/10"
              }
            >
              {formatCurrency(price)}
            </p>
          </div>
          <p
            className={"line-clamp-2 text-sm capitalize text-muted-foreground"}
          >
            {shortDescription.trim()}
          </p>
        </div>
        {isOwner && (
          <div className={"flex w-full justify-end gap-3"}>
            <Button asChild variant={"secondary"} size={"icon"}>
              <Link href={`/dashboard/seller/product/${id}/edit`}>
                <Pencil className={"size-4"} />
              </Link>
            </Button>
            <DeleteProduct productId={id} />
          </div>
        )}
        <Button className={"mt-3 w-full"} asChild>
          <Link href={`/product/${id}`}>View Product</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
