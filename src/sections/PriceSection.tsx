import PricingCard from "@/components/PricingCard";
import { PricingDetails } from "@/constans/price";
import React from "react";

const PriceSection = () => {
  return (
    <section className={"w-full p-2"}>
      <div className={"mx-auto my-6 max-w-5xl"}>
        <h1 className={"text-center text-xl font-bold lg:text-3xl"}>Pricing</h1>
        <p
          className={
            "mt-3 text-pretty text-center text-sm font-normal text-muted-foreground"
          }
        >
          Choose the plan that suits you best. All plans come with a 30-day
          money-back guarantee
        </p>
      </div>
      <div
        className={
          "grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10"
        }
      >
        {PricingDetails.map((price) => (
          <PricingCard
            key={price.id}
            id={price.id}
            title={price.title}
            price={price.price}
            isMostPopular={price.isMostPopular}
            features={price.features}
            type={price.type}
            link={price.link}
          />
        ))}
      </div>
    </section>
  );
};
export default PriceSection;
