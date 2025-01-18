import React from "react";
import TimeZoneClock from "../../../components/TimeZoneClock";
import UserPlan from "../../../components/UserPlan";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getSellerCurruntPlan } from "../../../apiFile/seller";
import StatsCardSection from "../../../sections/StatsCardSection";
import SellerLineChartSection from "../../../sections/SellerLineChartSection";
import SellerResentOrdersSideBar from "../../../sections/SellerResentOrdersSideBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const userPlan = await getSellerCurruntPlan(user.id);
  return (
    <section className={"container mx-auto"}>
      <Tabs defaultValue="statistics" className="w-full">
        <TabsList>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>
        <TabsContent value="statistics">
          <StatsCardSection forWho={"seller"} />
          <div className={"mt-4 grid w-full grid-cols-1 gap-3 lg:grid-cols-3"}>
            <div className={"lg:col-span-2"}>
              <SellerLineChartSection />
            </div>
            <div className={"lg:col-span-1"}>
              <SellerResentOrdersSideBar />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="utilities">
          <div
            className={
              "mx-auto flex flex-col justify-between gap-3 lg:flex-row"
            }
          >
            <TimeZoneClock />
            <UserPlan plan={userPlan?.plan ?? "basic"} />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
export default Page;
