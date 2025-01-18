import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CircleDollarSign, CreditCard, ShoppingBag } from "lucide-react";
import { NumberTicker } from "../components/animatios/NumberTicker";
import { cn } from "../lib/utils";

type StatsCardSectionProps = {
  forWho: "admin" | "seller";
};

const StatsCardSection = ({ forWho }: StatsCardSectionProps) => {
  return (
    <div className={"my-4 w-full"}>
      <div
        className={cn("grid w-full grid-cols-1 gap-4 md:grid-cols-2", {
          "lg:grid-cols-3": forWho === "seller",
          "lg:grid-cols-4": forWho === "admin",
        })}
      >
        <SingleStatsCard
          title={"Revenue"}
          description={"Total revenue for the all time"}
          value={1000}
          icon={<CircleDollarSign className={"size-4"} />}
        />
        <SingleStatsCard
          title={"No of Products"}
          description={"No of products in Your store"}
          value={3}
          icon={<ShoppingBag className={"size-4"} />}
        />
        <SingleStatsCard
          title={"No of Orders"}
          description={"No of orders in Your store"}
          value={3}
          icon={<CreditCard className={"size-4"} />}
        />
        {/*    if admin shows the total users*/}
      </div>
    </div>
  );
};
export default StatsCardSection;

type SingleStatsCardProps = {
  title: string;
  description: string;
  value: number;
  icon: React.ReactNode;
};

const SingleStatsCard = ({
  title,
  description,
  value,
  icon,
}: SingleStatsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"flex items-center justify-start gap-3"}>
          {icon} {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={"flex items-center justify-start gap-2"}>
          <span className={"text-3xl font-bold"}>$</span>
          <NumberTicker value={value} />
        </div>
      </CardContent>
    </Card>
  );
};
