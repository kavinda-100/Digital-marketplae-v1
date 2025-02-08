import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getSellerCurruntPlan } from "../../../apiFile/seller";
import TimeZoneClock from "../../../components/TimeZoneClock";
import UserPlan from "../../../components/UserPlan";
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
      <StatsCardSection forWho={"user"} />
      <div
        className={"mx-auto flex flex-col justify-between gap-3 lg:flex-row"}
      >
        <TimeZoneClock />
        <UserPlan plan={userPlan?.plan ?? "basic"} />
      </div>
    </section>
  );
};
export default Page;
