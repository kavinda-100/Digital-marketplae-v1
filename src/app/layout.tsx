import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Digital Hub",
  description: "A digital hub for all things digital",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className={"container mx-auto min-h-screen p-2"}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
