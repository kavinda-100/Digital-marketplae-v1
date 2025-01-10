import React from "react";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Digital Hub",
  description: "A digital hub for all things digital",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
