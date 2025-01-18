import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import RedirectPage from "@/pages/RedirectPage";

const MyOrdersPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return <RedirectPage />;
  }
  return (
    <section className={"container mx-auto"}>MyOrdersPage - table</section>
  );
};
export default MyOrdersPage;