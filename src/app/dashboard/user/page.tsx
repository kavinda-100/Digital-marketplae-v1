import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import StatsCardSection from "../../../sections/StatsCardSection";
import Chart from "./_chart/Chart";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <section className={"container mx-auto"}>
      <StatsCardSection forWho={"user"} />
      <Chart />
    </section>
  );
};
export default Page;
