import React from "react";
import SellerSellPage from "../../../../pages/SellerSellPage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { checkIsSeller } from "@/apiFile/sell";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const SellPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  // check if user is seller
  const isSeller = await checkIsSeller(user.id);
  if (!isSeller) {
    toast.error("You are not a seller");
    redirect("/");
  }
  return (
    <div className={"container mx-auto"}>
      <SellerSellPage />
    </div>
  );
};
export default SellPage;
