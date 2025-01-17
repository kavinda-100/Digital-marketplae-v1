import React from "react";
import type { Plan } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

type UserPlanProps = {
  plan: Plan;
};

const UserPlan = ({ plan }: UserPlanProps) => {
  return (
    <Card className={"w-auto"}>
      <CardHeader>
        <CardTitle>
          Your current plan is{" "}
          <span className={"font-bold capitalize text-primary"}>{plan}</span>
        </CardTitle>
        <CardDescription className={"text-pretty"}>
          You are currently subscribed to the{" "}
          <span className={"font-bold capitalize text-primary"}>{plan}</span>{" "}
          plan. Enjoy all the features and benefits that come with this plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <>
          {plan === "basic" ||
            (plan === "pro" && (
              <Button asChild>
                <Link href={"/pricing"}>Upgrade</Link>
              </Button>
            ))}
          {plan === "enterprise" && (
            <Button disabled={plan === "enterprise"}>
              <Link href={"/pricing"}>Upgrade</Link>
            </Button>
          )}
        </>
      </CardContent>
    </Card>
  );
};
export default UserPlan;
