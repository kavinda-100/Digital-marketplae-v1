import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import StatsCardSection from "../../../sections/StatsCardSection";
import AreaChartPage from "../../../components/admin/Revenue/AreaChartPage";
import UsersAreaChartPage from "../../../components/admin/users/UsersAreaChartPage";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <section className={"container mx-auto p-2"}>
      <h1 className={"text-2xl font-bold"}>Admin Panel</h1>
      <StatsCardSection forWho={"admin"} />
      <AreaChartPage />
      <UsersAreaChartPage />
    </section>
  );
};
export default Page;
