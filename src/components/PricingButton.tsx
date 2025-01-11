"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

type PricingButtonProps = {
  type: "basic" | "pro" | "enterprise";
  link: string;
};

const PricingButton = ({ type, link }: PricingButtonProps) => {
  const { user } = useKindeBrowserClient();
  const LinkWithEmail = `${link}?prefilled_email=${user?.email}`;

  const notifySignUp = () => {
    toast.error("You need to sign up to buy this plan");
  };
  return (
    <>
      {!user ? (
        <Button className={"w-full"} onClick={notifySignUp}>
          Buy Now
        </Button>
      ) : (
        <>
          {type === "basic" ? (
            <Button className={"w-full"}>Buy Now</Button>
          ) : (
            <Button className={"w-full"} asChild>
              <Link
                href={LinkWithEmail ?? "#"}
                target={"_blank"}
                className={"w-full text-start"}
              >
                Buy Now
              </Link>
            </Button>
          )}
        </>
      )}
    </>
  );
};
export default PricingButton;
