import React from "react";
import Head from "next/head";
import clsx from "clsx";

import { useTheme } from "@/hooks/document";

export type PageErrorLayoutProps = {
  children: React.ReactNode,
  status: number;
}

export const PageErrorLayout: React.FC<PageErrorLayoutProps> = ({ children, status }) => {
  useTheme();

  return (
    <>
      <Head>
        <title key={'title'}>{status}</title>
      </Head>
      <main className={clsx(
        'relative min-h-screen overflow-x-hidden p-5',
        'bg-gray-100 dark:bg-gray-800',
        'text-gray-900 dark:text-gray-200',
      )}>
        {children}
      </main>
    </>
  );
};
