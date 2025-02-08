import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import UserPage from "./_users/UserPage";

const Page = () => {
  return (
    <section className={"container mx-auto"}>
      <Card className={"mt-4 border-0 shadow-sm"}>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UserPage />
        </CardContent>
      </Card>
    </section>
  );
};
export default Page;
