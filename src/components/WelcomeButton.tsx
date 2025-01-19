import React from "react";
import type { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import type { Role } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Atom } from "lucide-react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import ButtonRotatingBackgroundGradient from "./ButtonRotatingBackgroundGradient";

type WelcomeButtonProps = {
  user: KindeUser<Record<string, any>> | null;
  role: Role;
};

const WelcomeButton = ({ user, role }: WelcomeButtonProps) => {
  return (
    <>
      {user ? (
        <Link
          href={
            role === "ADMIN"
              ? "/dashboard/admin"
              : role === "SELLER"
                ? "/dashboard/seller"
                : "/dashboard/user"
          }
        >
          <Button>
            {" "}
            <Atom className={"mr-2 size-4"} /> Continue To Dashboard
          </Button>
        </Link>
      ) : (
        <RegisterLink>
          <ButtonRotatingBackgroundGradient text={"Get Start Today"} />
        </RegisterLink>
      )}
    </>
  );
};
export default WelcomeButton;
