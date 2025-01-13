import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import RedirectPage from "@/pages/RedirectPage";
import SingleTypeProductCards from "@/components/SingleTypeProductCards";

const TemplatePage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return <RedirectPage />;
  }
  return (
    <section className={"container mx-auto min-h-[calc(100vh-10vh)] p-2"}>
      <SingleTypeProductCards
        type={"TEMPLATES"}
        heading={"Templates"}
        isHome={false}
        limit={10}
      />
    </section>
  );
};
export default TemplatePage;
