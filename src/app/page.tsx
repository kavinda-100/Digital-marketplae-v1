import {
  getKindeServerSession,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../components/ui/button";
import { getUserBuId } from "@/apiFile";
import Link from "next/link";
import { Atom } from "lucide-react";
import ButtonRotatingBackgroundGradient from "@/components/ButtonRotatingBackgroundGradient";

export default async function HomePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getUserBuId({ userId: user?.id });
  return (
    <section className={"container mx-auto"}>
      <section className={"mx-auto mt-20 max-w-2xl"}>
        {/*<div*/}
        {/*    className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>*/}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]"></div>

        <div className={"my-4 flex w-full items-center justify-center"}>
          <div
            className={
              "w-fit rounded-lg border bg-primary/20 px-2 py-1 text-center font-mono font-thin tracking-tight text-primary/60"
            }
          >
            Digital Hub v1.0.0
          </div>
        </div>
        <h1
          className={
            "text-pretty text-center text-xl font-extrabold tracking-tight text-black/80 dark:text-white/90 lg:text-5xl"
          }
        >
          Welcome To The <br />{" "}
          <span className={"text-primary/70"}>
            Digital <span className={"text-primary"}>Hub</span>
          </span>
        </h1>
        <p
          className={
            "mt-8 text-pretty text-center font-sans text-lg font-semibold capitalize lg:text-xl"
          }
        >
          Your one-stop shop for all your digital needs. Discover a world of
          online services, from web design and development to digital marketing
          and beyond.
        </p>
        <div className={"mt-6 text-center"}>
          {user ? (
            <>
              <Link
                href={
                  data?.role === "ADMIN"
                    ? "/dashboard/admin"
                    : data?.role === "SELLER"
                      ? "/dashboard/seller"
                      : "/dashboard/user"
                }
              >
                <Button>
                  {" "}
                  <Atom className={"mr-2 size-4"} /> Continue To Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <RegisterLink>
                <ButtonRotatingBackgroundGradient text={"Get Start Today"} />
              </RegisterLink>
            </>
          )}
        </div>
      </section>
    </section>
  );
}
