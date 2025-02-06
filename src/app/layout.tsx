import React from "react";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
// providers
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import TanStackQueryProvider from "../providers/TanStackQueryProvider";
// kinde auth
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserBuId } from "@/apiFile";
// uploadthing
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
// components
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Digital Hub",
  description: "A digital hub for all things digital",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getUserBuId({ userId: user?.id });
  return (
    <AuthProvider>
      <html
        lang="en"
        className={`${GeistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <body>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main
              className={"container mx-auto flex min-h-screen flex-col p-2"}
            >
              <TanStackQueryProvider>
                <Header role={data?.role ?? "SELLER"} />
                <section className={"flex flex-1"}>{children}</section>
                <Footer />
                <Toaster richColors closeButton />
              </TanStackQueryProvider>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
