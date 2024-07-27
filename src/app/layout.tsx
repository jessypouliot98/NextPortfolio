import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Jessy Pouliot",
  description: "Full-Stack developer who specializes in Typescript. From front-end to back-end, I'll build mobile apps, websites with React, React-Native, Next.js and more.",
};

export default function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "bg-gray-900 text-gray-50 font-sans overflow-x-hidden",
        )}
      >
        <header className="z-10 sticky top-0">
          <nav className="h-16 bg-black/70 backdrop-blur-sm">
            <menu className="flex gap-2 items-center">
              <li>Home</li>
              <li>Portfolio</li>
            </menu>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
