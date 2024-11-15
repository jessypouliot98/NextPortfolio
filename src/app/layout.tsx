import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { RootHeader } from "@/components/part/RootHeader/RootHeader";
import { ThemeProvider } from "@/modules/theme/ThemeProvider";
import { MyDesktop } from "@/components/part/MyDesktop/MyDesktop";
import { getFinderRootDir, getMacDock } from "@/modules/cms/queries";

export const metadata: Metadata = {
  title: "Jessy Pouliot",
  description: "Full-Stack developer who specializes in Typescript. From front-end to back-end, I'll build mobile apps, websites with React, React-Native, Next.js and more.",
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const [macDock, finderRoot] = await Promise.all([
    getMacDock(),
    getFinderRootDir(),
  ]);

  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans overflow-x-hidden">
      <ThemeProvider>
        <div className={clsx(
          "bg-gray-100 text-gray-900",
          "dark:bg-gray-900 dark:text-gray-50",
        )}>
          <RootHeader />
          {children}
          <footer className="max-w-screen-xl mx-auto p-8">
            &copy; {new Date().getFullYear()} Jessy Pouliot, All rights reserved.
          </footer>
        </div>
        <MyDesktop dock={macDock} finderRoot={finderRoot} />
      </ThemeProvider>
      </body>
    </html>
  );
}
