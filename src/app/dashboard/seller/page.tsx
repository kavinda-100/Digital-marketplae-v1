import React from "react";
import TimeZoneClock from "../../../components/TimeZoneClock";
import UserPlan from "../../../components/UserPlan";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getSellerCurruntPlan } from "../../../apiFile/seller";
import StatsCardSection from "../../../sections/StatsCardSection";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const userPlan = await getSellerCurruntPlan(user.id);
  return (
    <section className={"container mx-auto"}>
      <div className={"mx-auto flex justify-between gap-3"}>
        <TimeZoneClock />
        <UserPlan plan={userPlan?.plan ?? "basic"} />
      </div>
      <StatsCardSection forWho={"seller"} />
    </section>
  );
};
export default Page;
