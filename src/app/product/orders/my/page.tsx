import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import RedirectPage from "@/pages/RedirectPage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import MyOrderTablePage from "./TablePage";

const MyOrdersPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return <RedirectPage />;
  }
  return (
    <section className={"container mx-auto"}>
      <Card className={"border-0 shadow-none"}>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <MyOrderTablePage />
        </CardContent>
      </Card>
    </section>
  );
};
export default MyOrdersPage;
