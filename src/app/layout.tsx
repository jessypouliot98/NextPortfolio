import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { RootHeader } from "@/components/part/RootHeader/RootHeader";
import { ThemeProvider } from "@/modules/theme/ThemeProvider";
import { MyDesktop } from "@/components/part/MyDesktop/MyDesktop";
import { getFinderRootDir, getMacDock } from "@/modules/cms/queries";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Jessy Pouliot",
  description: "Full-Stack developer who specializes in Typescript. From front-end to back-end, I'll build mobile apps, websites with React, React-Native, Next.js and more.",
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  // Move query to behind suspence
  const [macDock, finderRoot] = await Promise.all([
    getMacDock(),
    getFinderRootDir(),
  ]);

  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <title>Jessy Pouliot - FullStack TypeScript Developer - Montreal</title>
        <meta name="description" content="I specialize in building modern, high-performance web and mobile apps using TypeScript, Next.js, React, and React Native. With a focus on intuitive UI/UX design, I deliver scalable solutions that elevate user experiences."/>
      </Head>
      <body className={clsx(
        "font-sans",
        "bg-gray-100 text-gray-900",
        "dark:bg-gray-900 dark:text-gray-50",
        "w-full overflow-x-hidden"
      )}>
      <ThemeProvider>
        <RootHeader />
        {children}
        <footer className="max-w-screen-xl mx-auto p-8">
          &copy; {new Date().getFullYear()} Jessy Pouliot, All rights reserved.
        </footer>
        <Suspense fallback={null}>
          <MyDesktop dock={macDock} finderRoot={finderRoot} />
        </Suspense>
      </ThemeProvider>
      </body>
    </html>
  );
}
