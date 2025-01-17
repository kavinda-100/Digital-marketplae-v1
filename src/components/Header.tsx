"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Role } from "@prisma/client";
import { randomLetter } from "../lib/utils";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Templates",
    href: "/templates",
  },
  {
    name: "UI Kits",
    href: "/ui",
  },
  {
    name: "Icons",
    href: "/icons",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

type HeaderProps = {
  role: Role | undefined;
};

const Header = ({ role }: HeaderProps) => {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient();

  const pathToDashboard =
    role && role === "SELLER"
      ? "/dashboard/seller"
      : role === "ADMIN"
        ? "/dashboard/admin"
        : "/dashboard/user";
  return (
    <header className={"container mx-auto flex w-full p-2"}>
      {/* logo */}
      <div className={"w-full justify-start"}>
        <Link href={"/"}>
          <div className={"text-lg font-bold text-primary/50 lg:text-2xl"}>
            Digital <span className={"text-primary"}>Hub</span>
          </div>
        </Link>
      </div>

      {/* links */}
      <div
        className={"mx-auto hidden items-center justify-center gap-3 lg:flex"}
      >
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant={pathname === item.href ? "secondary" : "ghost"}
            asChild
          >
            <Link href={item.href} className={"font-semibold"}>
              {item.name}
            </Link>
          </Button>
        ))}
      </div>

      {/* auth */}
      <div className={"hidden w-full justify-end lg:flex"}>
        {user ? (
          <div className={"flex items-center justify-center gap-3"}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className={"cursor-pointer"}>
                  <AvatarImage src={user.picture ?? ""} />
                  <AvatarFallback>
                    {user?.given_name?.charAt(0) ?? randomLetter()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/product/orders/my"}>My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={"font-bold"}>
                  <LogoutLink>Sign out</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant={"secondary"} asChild>
              <Link href={pathToDashboard}>Dashboard</Link>
            </Button>
            <ModeToggle />
          </div>
        ) : (
          <>
            <div className={"flex items-center justify-center gap-3"}>
              <Button variant={"secondary"} asChild>
                <LoginLink>Sign in</LoginLink>
              </Button>
              <Button asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
              <ModeToggle />
            </div>
          </>
        )}
      </div>

      {/*mobile header */}
      <div className={"flex justify-end lg:hidden"}>
        <MobileHeader role={role} />
      </div>
    </header>
  );
};

export default Header;

const MobileHeader = ({ role }: { role: Role | undefined }) => {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient();
  const pathToDashboard =
    role && role === "SELLER"
      ? "/dashboard/seller"
      : role === "ADMIN"
        ? "/dashboard/admin"
        : "/dashboard/user";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignRight className={"size-5"} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className={"my-3 flex items-center justify-center gap-3"}>
            <Avatar>
              <AvatarImage src={user?.picture ?? ""} />
              <AvatarFallback>
                {user?.given_name?.charAt(0) ?? randomLetter()}
              </AvatarFallback>
            </Avatar>
            <SheetTitle className={"text-primary/50"}>
              Digital <span className={"text-primary"}>Hub</span>
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className={"flex w-full flex-col gap-2 p-2"}>
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant={pathname === item.href ? "secondary" : "ghost"}
              asChild
              className={"flex w-full justify-start"}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <div className={"my-2 w-full border px-2"} />
        <div className={"flex flex-col gap-3 p-2"}>
          {user ? (
            <>
              <Link href={"/profile"}>Profile</Link>
              <Link href={"/#"}>Billing</Link>
              <Link href={"/#"}>Subscription</Link>
              <Button asChild variant={"outline"}>
                <Link href={pathToDashboard}>Dashboard</Link>
              </Button>
              <Button asChild>
                <LogoutLink>Sign out</LogoutLink>
              </Button>
            </>
          ) : (
            <>
              <Button variant={"secondary"} asChild>
                <LoginLink>Sign in</LoginLink>
              </Button>
              <Button asChild>
                <RegisterLink>Sign up</RegisterLink>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
