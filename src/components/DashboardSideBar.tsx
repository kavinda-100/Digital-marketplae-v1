"use client";

import React from "react";
import type { Role } from "@prisma/client";
import { usePathname } from "next/navigation";
import { sellerNav, userNav, adminNav } from "../constans/dashboardNav";
import { Button } from "./ui/button";
import Link from "next/link";

type DashboardSideBarProps = {
  role: Role;
};

const DashboardSideBar = ({ role }: DashboardSideBarProps) => {
  const pathname = usePathname();
  return (
    <div className={"h-max w-full max-w-[200px]"}>
      <div className={"flex w-full flex-col gap-3"}>
        <>
          {role === "SELLER"
            ? sellerNav.map((nav, index) => (
                <Button
                  asChild
                  key={index}
                  variant={pathname === nav.href ? "secondary" : "ghost"}
                  className={"flex items-center justify-start"}
                >
                  <div
                    className={"flex w-full items-center justify-start gap-2"}
                  >
                    {nav.icon}
                    <Link href={nav.href} className={"w-full text-start"}>
                      {nav.name}
                    </Link>
                  </div>
                </Button>
              ))
            : role === "ADMIN"
              ? adminNav.map((nav, index) => (
                  <Button
                    asChild
                    key={index}
                    variant={pathname === nav.href ? "secondary" : "ghost"}
                    className={"flex items-center justify-start"}
                  >
                    <div
                      className={"flex w-full items-center justify-start gap-2"}
                    >
                      {nav.icon}
                      <Link href={nav.href} className={"w-full text-start"}>
                        {nav.name}
                      </Link>
                    </div>
                  </Button>
                ))
              : userNav.map((nav, index) => (
                  <Button
                    asChild
                    key={index}
                    variant={pathname === nav.href ? "secondary" : "ghost"}
                    className={"flex items-center justify-start"}
                  >
                    <div
                      className={"flex w-full items-center justify-start gap-2"}
                    >
                      {nav.icon}
                      <Link href={nav.href} className={"w-full text-start"}>
                        {nav.name}
                      </Link>
                    </div>
                  </Button>
                ))}
        </>
      </div>
    </div>
  );
};
export default DashboardSideBar;
