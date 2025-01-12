import React from "react";
import OnboardingPage from "@/pages/OnboardingPage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { checkIsFinishedOnBoarding } from "@/apiFile/onBoarding";

export default async function Onboarding() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const data = await checkIsFinishedOnBoarding(user.id);
  if (data) {
    redirect("/");
  }
  return (
    <section className={"container mx-auto"}>
      <OnboardingPage />
    </section>
  );
}
