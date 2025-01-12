import React from "react";
import DashboardSideBar from "../../components/DashboardSideBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserBuId } from "../../apiFile";
import DashboardSideBarMobile from "../../components/DashboardSideBarMobile";

const DashboardLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const role = await getUserBuId({ userId: user.id });
  return (
    <section className={"container mx-auto flex min-h-screen gap-3"}>
      <section className={"hidden w-full gap-3 md:flex"}>
        <DashboardSideBar role={role?.role ?? "SELLER"} />
        {children}
      </section>
      {/* mobile version */}
      <section className={"flex w-full flex-col gap-3 md:hidden"}>
        <DashboardSideBarMobile role={role?.role ?? "SELLER"} />
        {children}
      </section>
    </section>
  );
};
export default DashboardLayout;
