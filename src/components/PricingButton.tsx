"use client";

import React from "react";
import { Button } from "./ui/button";

type PricingButtonProps = {
  type: "basic" | "pro" | "enterprise";
};

const PricingButton = ({ type }: PricingButtonProps) => {
  return <Button className={"w-full"}>Buy Now</Button>;
};
export default PricingButton;
