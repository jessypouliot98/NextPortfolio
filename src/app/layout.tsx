import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { RootHeader } from "@/components/part/RootHeader/RootHeader";
import { ThemeProvider } from "@/modules/theme/ThemeProvider";
import { MacDock } from "@/components/part/MacDock/MacDock";
import { getMacDock } from "@/modules/cms/queries";
import { DesktopAppManager } from "@/components/part/DesktopAppManager/DesktopAppManager";

export const metadata: Metadata = {
  title: "Jessy Pouliot",
  description: "Full-Stack developer who specializes in Typescript. From front-end to back-end, I'll build mobile apps, websites with React, React-Native, Next.js and more.",
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const macDock = await getMacDock();
  return (
    <html lang="en">
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
        <DesktopAppManager dock={macDock} />
      </ThemeProvider>
      </body>
    </html>
  );
}
