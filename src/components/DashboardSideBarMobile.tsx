"use client";

import React from "react";
import type { Role } from "@prisma/client";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { AlignLeft } from "lucide-react";
import { sellerNav, userNav, adminNav } from "@/constans/dashboardNav";
import { Button } from "./ui/button";
import Link from "next/link";

type DashboardSideBarMobileProps = {
  role: Role;
};

const DashboardSideBarMobile = ({ role }: DashboardSideBarMobileProps) => {
  const pathname = usePathname();

  return (
    <div className={"w-full"}>
      <Sheet>
        <SheetTrigger asChild>
          <AlignLeft className={"size-5"} />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Seller Navigation</SheetTitle>
          </SheetHeader>
          <div className={"mt-5 flex w-full flex-col gap-3"}>
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
                        className={
                          "flex w-full items-center justify-start gap-2"
                        }
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
                          className={
                            "flex w-full items-center justify-start gap-2"
                          }
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
                          className={
                            "flex w-full items-center justify-start gap-2"
                          }
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
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default DashboardSideBarMobile;
