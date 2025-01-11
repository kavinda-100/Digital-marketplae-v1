"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type PricingButtonProps = {
  type: "basic" | "pro" | "enterprise";
  link: string;
};

const PricingButton = ({ type, link }: PricingButtonProps) => {
  const { user } = useKindeBrowserClient();
  const LinkWithEmail = `${link}?prefilled_email=${user?.email}`;
  return (
    <>
      {!user ? (
        <Button className={"w-full"}>Buy Now</Button>
      ) : (
        <Button className={"w-full"} asChild disabled={type == "basic"}>
          {type == "basic" ? (
            <Link href={"#"}>Buy Now</Link>
          ) : (
            <Link
              href={LinkWithEmail ?? "#"}
              target={"_blank"}
              className={"w-full text-start"}
            >
              Buy Now
            </Link>
          )}
        </Button>
      )}
    </>
  );
};
export default PricingButton;
