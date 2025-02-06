import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserBuId } from "@/apiFile";
import PriceSection from "../sections/PriceSection";
import { Suspense } from "react";
import ProductCardSkeleton from "@/skeletons/ProductCardSkeleton";
import SingleTypeProductCards from "@/components/SingleTypeProductCards";
import { Testimonials } from "@/components/animatios/eldoraui/testimonals";
import { Logos } from "../components/animatios/eldoraui/Logos";
import WelcomeButton from "../components/WelcomeButton";
import HeroBg from "../components/HeroBG";
import { TypewriterEffectSmooth } from "../components/animatios/aceternity/typewriter-effect";

const words = [
  { text: "Welcome" },
  { text: "To" },
  { text: "The" },
  {
    text: "Digital",
    className: "text-primary/70 dark:text-primary",
  },
  {
    text: "Hub",
    className: "text-primary dark:text-primary",
  },
];

export default async function HomePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getUserBuId({ userId: user?.id });
  return (
    <section className={"container mx-auto"}>
      {/* hero section */}
      <section className={"mx-auto mt-20 max-w-2xl"}>
        {/*<div*/}
        {/*    className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>*/}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]"></div>

        <div className={"my-4 flex w-full items-center justify-center"}>
          <div
            className={
              "w-fit rounded-lg border bg-primary/30 px-2 py-1 text-center font-mono font-thin tracking-tight text-gray-700 dark:border-primary dark:bg-primary/50 dark:text-white"
            }
          >
            Digital Hub v1.0.0
          </div>
        </div>
        <TypewriterEffectSmooth words={words} />
        <p
          className={
            "mt-8 text-pretty text-center font-sans text-lg font-medium capitalize lg:text-xl"
          }
        >
          Your one-stop shop for all your digital needs. Discover a world of
          online services, from web design and development to digital marketing
          and beyond.
        </p>
        <div
          className={"container mx-auto mt-10 flex items-center justify-center"}
        >
          <WelcomeButton user={user} role={data?.role ?? "USER"} />
        </div>
      </section>

      {/*  hero bg */}
      <HeroBg />

      {/*  card section */}
      <section
        className={"flex w-full flex-col items-center justify-center gap-4"}
      >
        <Suspense fallback={<ProductCardSkeleton />}>
          <SingleTypeProductCards
            type={"TEMPLATES"}
            heading={"Templates"}
            isHome={true}
            limit={3}
            href={"templates"}
          />
        </Suspense>
        <Suspense fallback={<ProductCardSkeleton />}>
          <SingleTypeProductCards
            type={"UIKITS"}
            heading={"UI KITS"}
            isHome={true}
            limit={3}
            href={"ui"}
          />
        </Suspense>
        <Suspense fallback={<ProductCardSkeleton />}>
          <SingleTypeProductCards
            type={"ICONS"}
            heading={"ICONS"}
            isHome={true}
            limit={3}
            href={"icons"}
          />
        </Suspense>
      </section>

      {/*  pricing section */}
      <PriceSection />

      {/*  Logos */}
      <section className={"container mx-auto mb-8"}>
        <Logos />
      </section>

      {/*  testimonial section*/}
      <section className="container relative z-10 mx-auto mb-8 mt-4 h-[700px] w-full overflow-hidden rounded-lg bg-background">
        <Testimonials />
      </section>

      <div
        className={"container mx-auto my-10 flex items-center justify-center"}
      >
        <WelcomeButton user={user} role={data?.role ?? "USER"} />
      </div>
    </section>
  );
}
