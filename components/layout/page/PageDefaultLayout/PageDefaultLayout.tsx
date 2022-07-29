import React from "react";
import clsx from "clsx";

import { Footer, Header } from "@/components/parts";
import Head from "next/head";

export type PageDefaultLayoutProps = {
  children: React.ReactNode,
  title?: string;
}

export const PageDefaultLayout: React.FC<PageDefaultLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title key={'title'}>{title}</title>
      </Head>
      <div className={clsx(
        'relative flex flex-col min-h-screen overflow-x-hidden',
        'bg-gray-100 dark:bg-gray-800',
        'text-gray-900 dark:text-gray-300',
      )}>
        <Header />
        <main className={clsx('p-5 w-full h-full flex-1 max-w-[1024px] mx-auto')}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
