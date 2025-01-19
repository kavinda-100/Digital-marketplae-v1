"use client";

import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  { src: "/sOne.png", alt: "hero-bg-one" },
  { src: "/sTwo.png", alt: "hero-bg-two" },
  { src: "/sThree.png", alt: "hero-bg-three" },
];

const HeroBg = () => {
  return (
    <section className={"mb-5 mt-10 h-auto w-full"}>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className={"mx-auto w-full"}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className={"relative lg:h-[800px]"}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={
                    "w-full rounded-lg border object-contain shadow-md lg:!h-[700px]"
                  }
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)] dark:bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#7BBFFF,transparent)]"></div>
      </div>
    </section>
  );
};
export default HeroBg;

//* version 1
// const HeroBg = () => {
//     return (
//         <section className={"mb-5 mt-10 h-auto w-full"}>
//             <Image
//                 src={"/sOne.png"}
//                 alt={"hero-bg"}
//                 width={1000}
//                 height={1000}
//                 layout={"responsive"}
//                 objectFit={"contain"}
//                 className={"rounded-lg border object-contain shadow-md"}
//             />
//             {/*<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)] dark:bg-[size:6rem_4rem]">*/}
//             {/*  <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#A0DFFF,transparent)]"></div>*/}
//             {/*</div>*/}
//
//             <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-black dark:bg-[linear-gradient(to_right,#303030_1px,transparent_1px),linear-gradient(to_bottom,#303030_1px,transparent_1px)] dark:bg-[size:6rem_4rem]">
//                 <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#7BBFFF,transparent)]"></div>
//             </div>
//         </section>
//     );
// };
// export default HeroBg;
