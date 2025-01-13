import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductCardSkeleton from "@/skeletons/ProductCardSkeleton";
import SingleTab from "@/components/SingleTab";

const SellerProducts = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <section className={"container mx-auto p-2"}>
      <Tabs defaultValue="template" className="w-full">
        <TabsList>
          <TabsTrigger value="template">Templates</TabsTrigger>
          <TabsTrigger value="uikit">UiKits</TabsTrigger>
          <TabsTrigger value="icon">Icons</TabsTrigger>
        </TabsList>
        <TabsContent value="template">
          <Suspense fallback={<ProductCardSkeleton />}>
            <SingleTab kindUserId={user.id} type={"TEMPLATES"} />
          </Suspense>
        </TabsContent>
        <TabsContent value="uikit">
          <Suspense fallback={<ProductCardSkeleton />}>
            <SingleTab kindUserId={user.id} type={"UIKITS"} />
          </Suspense>
        </TabsContent>
        <TabsContent value="icon">
          <Suspense fallback={<ProductCardSkeleton />}>
            <SingleTab kindUserId={user.id} type={"ICONS"} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </section>
  );
};
export default SellerProducts;
