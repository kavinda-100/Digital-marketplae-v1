import React from "react";
import ViewFullOrder from "./ViewFullOrder";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <section className={"container mx-auto"}>
      <ViewFullOrder id={id} />
    </section>
  );
};
export default Page;
