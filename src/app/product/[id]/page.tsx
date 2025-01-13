import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getSingleProductById } from "../../../apiFile/product";
import RedirectPage from "../../../pages/RedirectPage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import { formatCurrency } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import TipTapEditorForm from "../../../TipTapEditer/TipTapEditorForm";
import { Separator } from "../../../components/ui/separator";
import Image from "next/image";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const id = (await params).id;
  const data = await getSingleProductById(id);

  if (!user) {
    return <RedirectPage />;
  }

  if (!id) {
    return (
      <div className={"flex h-full w-full items-center justify-center"}>
        <p
          className={"text-center text-sm font-semibold text-muted-foreground"}
        >
          Invalid Product ID
        </p>
      </div>
    );
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
  return (
    <section className={"container mx-auto"}>
      <div className={"mb-6 mt-6 flex h-full w-full flex-col gap-4"}>
        <div className={"flex h-full w-full flex-col gap-10 lg:flex-row"}>
          <div className={"w-full lg:w-1/2"}>
            <Carousel className={"mx-auto w-full"}>
              <CarouselContent>
                {data.thumbnail.map((thumbnail, index) => (
                  <CarouselItem key={index}>
                    <div className={"relative h-[250px] w-full lg:h-[400px]"}>
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
          </div>
          <div className={"w-full lg:w-1/2"}>
            <div className={"flex h-full w-full flex-col gap-6"}>
              <h1 className={"text-2xl font-bold tracking-tight"}>
                {data.name}
              </h1>
              <p
                className={
                  "inline-flex w-fit items-center rounded-md bg-primary/10 px-2 py-1 font-mono text-xl font-bold text-primary ring-1 ring-inset ring-primary/10"
                }
              >
                {formatCurrency(data.price)}
              </p>
              <p className={"text-lg capitalize text-muted-foreground"}>
                {data.shortDescription.trim()}
              </p>
              <Separator className={"my-3 w-full"} />
              <Button className={"w-full"}>Check Out</Button>
            </div>
          </div>
        </div>
        <section className={"h-auto w-full p-2"}>
          <TipTapEditorForm content={data.longDescription} />
        </section>
      </div>
    </section>
  );
};
export default SingleProductPage;
