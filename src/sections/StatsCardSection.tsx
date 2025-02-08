import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  CircleDollarSign,
  CircleX,
  CreditCard,
  Handshake,
  ShoppingBag,
  Users,
  UsersRound,
} from "lucide-react";
import { NumberTicker } from "../components/animatios/magicui/NumberTicker";
import { getSellerStats } from "../actions/sellerDashboardActions";
import { getAdminStats } from "../actions/adminDashboardActions";
import { getUserStats } from "../actions/userDashboardActions";

type StatsCardSectionProps = {
  forWho: "admin" | "seller" | "user";
};

const StatsCardSection = async ({ forWho }: StatsCardSectionProps) => {
  const AdminData = {
    revenue: 0,
    noOfUsers: 0,
    noOfSellers: 0,
    noOfProducts: 0,
    noOfOrders: 0,
    noOfSubscriptions: 0,
  };

  const SellerData = {
    revenue: 0,
    noOfProducts: 0,
    noOfOrders: 0,
  };

  const UserData = {
    spentAmount: 0,
    noOfOrders: 0,
    noOfOrdersCanceled: 0,
  };

  if (forWho === "seller") {
    const data = await getSellerStats();
    SellerData.revenue = data?.revenue || 0;
    SellerData.noOfProducts = data?.noOfProducts || 0;
    SellerData.noOfOrders = data?.noOfOrders || 0;
  }
  if (forWho === "admin") {
    const data = await getAdminStats();
    AdminData.revenue = data?.revenue || 0;
    AdminData.noOfUsers = data?.noOfUsers || 0;
    AdminData.noOfSellers = data?.noOfSellers || 0;
    AdminData.noOfProducts = data?.noOfProducts || 0;
    AdminData.noOfOrders = data?.noOfOrders || 0;
    AdminData.noOfSubscriptions = data?.noOfSubscriptions || 0;
  }

  if (forWho === "user") {
    const data = await getUserStats();
    UserData.spentAmount = data?.spentAmount || 0;
    UserData.noOfOrders = data?.noOfOrders || 0;
    UserData.noOfOrdersCanceled = data?.noOfOrdersCanceled || 0;
  }

  return (
    <div className={"my-4 w-full"}>
      <div
        className={
          "grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        }
      >
        {forWho === "seller" ? (
          <>
            <SingleStatsCard
              title={"Revenue"}
              description={"Total revenue for the all time"}
              value={SellerData.revenue}
              icon={<CircleDollarSign className={"size-4 text-primary"} />}
              isIconShow={true}
            />
            <SingleStatsCard
              title={"Products"}
              description={"No of products in Your store"}
              value={SellerData.noOfProducts}
              icon={<ShoppingBag className={"size-4 text-primary"} />}
              isIconShow={false}
            />
            <SingleStatsCard
              title={"Orders"}
              description={"No of orders in Your store"}
              value={SellerData.noOfOrders}
              icon={<CreditCard className={"size-4 text-primary"} />}
              isIconShow={false}
            />
          </>
        ) : forWho === "user" ? (
          <>
            <SingleStatsCard
              title={"Orders Made"}
              description={"No of orders made by you"}
              value={UserData.noOfOrders}
              icon={<CreditCard className={"size-4 text-primary"} />}
              isIconShow={false}
            />
            <SingleStatsCard
              title={"Orders Canceled"}
              description={"No of orders canceled by you"}
              value={UserData.noOfOrdersCanceled}
              icon={<CircleX className={"size-4 text-primary"} />}
              isIconShow={false}
            />
            <SingleStatsCard
              title={"Spent Amount"}
              description={"Total amount spent by you"}
              value={UserData.spentAmount}
              icon={<CircleDollarSign className={"size-4 text-primary"} />}
              isIconShow={true}
            />
          </>
        ) : (
          <>
            <SingleStatsCard
              title={"Revenue"}
              description={"Total revenue for the all time"}
              value={AdminData.revenue}
              icon={<CircleDollarSign className={"size-4 text-primary"} />}
              isIconShow={true}
            />
            <SingleStatsCard
              title={"Users"}
              description={"No of User in the store"}
              value={AdminData.noOfUsers}
              icon={<Users className={"size-4 text-primary"} />}
              isIconShow={false}
            />
            <SingleStatsCard
              title={"Sellers"}
              description={"No of sellers in the store"}
              value={AdminData.noOfSellers}
              icon={<UsersRound className={"size-4 text-primary"} />}
              isIconShow={false}
            />
            <SingleStatsCard
              title={"Products"}
              description={"No of products in Your store"}
              value={AdminData.noOfProducts}
              icon={<ShoppingBag className={"size-4 text-primary"} />}
              isIconShow={false}
            />
            <SingleStatsCard
              title={"Orders"}
              description={"No of orders in Your store"}
              value={AdminData.noOfOrders}
              icon={<CreditCard className={"size-4 text-primary"} />}
              isIconShow={false}
            />
            <SingleStatsCard
              title={"Subscriptions"}
              description={"No of subscriptions in the store"}
              value={AdminData.noOfSubscriptions}
              icon={<Handshake className={"size-4 text-primary"} />}
              isIconShow={false}
            />
          </>
        )}
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
  isIconShow: boolean;
};

const SingleStatsCard = ({
  title,
  description,
  value,
  icon,
  isIconShow,
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
          {isIconShow && <span className={"text-3xl font-bold"}>$</span>}
          {value === 0 ? (
            <p className={"text-3xl font-bold tabular-nums tracking-wider"}>
              0
            </p>
          ) : (
            <NumberTicker value={value} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
