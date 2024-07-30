import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { RootHeader } from "@/components/part/RootHeader/RootHeader";

export const metadata: Metadata = {
  title: "Jessy Pouliot",
  description: "Full-Stack developer who specializes in Typescript. From front-end to back-end, I'll build mobile apps, websites with React, React-Native, Next.js and more.",
};

export default function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html className="dark" lang="en">
      <body
        className={clsx(
          "font-sans overflow-x-hidden",
          "bg-gray-100 text-gray-900",
          "dark:bg-gray-900 dark:text-gray-50",
        )}
      >
        <RootHeader />
        {children}
        <footer className="max-w-screen-xl p-8 text-blue-100">
          &copy; 2024 Jessy Pouliot, All rights reserved.
        </footer>
      </body>
    </html>
  );
}
