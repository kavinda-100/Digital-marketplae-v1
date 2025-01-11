import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check, PartyPopper } from "lucide-react";
import { formatCurrency } from "../lib/utils";
import PricingButton from "./PricingButton";

type PricingCardProps = {
  id: number;
  title: string;
  price: number;
  isMostPopular: boolean;
  features: { name: string }[];
  type: "basic" | "pro" | "enterprise";
  link: string;
};

const PricingCard = ({
  id,
  title,
  price,
  isMostPopular,
  features,
  type,
  link,
}: PricingCardProps) => {
  console.log(id, "id");
  return (
    <Card className={"flex w-full flex-col items-start justify-between"}>
      <CardHeader>
        <div className={"flex w-full items-center justify-between gap-3"}>
          <CardTitle>{title}</CardTitle>
          {isMostPopular && (
            <div
              className={
                "inline-flex items-center gap-3 rounded-md bg-primary/10 px-2 py-1 font-mono text-xs font-bold text-primary ring-1 ring-inset ring-primary/10"
              }
            >
              <PartyPopper className={"size-4"} />
              <p className={"text-xs"}>Most Popular</p>
            </div>
          )}
        </div>
        <p className={"text-pretty font-sans text-lg font-bold md:text-xl"}>
          {formatCurrency(price)}
        </p>
      </CardHeader>
      <CardContent>
        {features.map((feature, index) => (
          <Features key={index} features={feature.name} />
        ))}
      </CardContent>
      <CardFooter className={"flex w-full flex-col gap-3"}>
        <div className={"border-t-1 w-full border"} />
        <PricingButton type={type} link={link} />
      </CardFooter>
    </Card>
  );
};

export default PricingCard;

const Features = ({ features }: { features: string }) => {
  return (
    <div className={"my-2 flex items-center justify-start gap-3"}>
      <div className={"rounded-full border border-primary p-1"}>
        <Check className={"size-3 text-primary"} />
      </div>
      <p className={"text-pretty font-sans text-lg font-medium"}>{features}</p>
    </div>
  );
};
