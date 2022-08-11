import React from "react";
import Head from "next/head";
import clsx from "clsx";

import { Footer, Header } from "@/components/parts";

export type PageDefaultLayoutProps = {
  children: React.ReactNode,
  title?: string;
  description?: string;
}

export const PageDefaultLayout: React.FC<PageDefaultLayoutProps> = ({ children, title, description }) => {
  return (
    <>
      <Head>
        {title && <title key={'title'}>{title}</title>}
        {description && (<meta key={'description'} name={'description'} content={description} />)}
      </Head>
      <div className={clsx(
        'relative flex flex-col min-h-screen overflow-x-hidden',
        'bg-gray-100 dark:bg-gray-800',
        'text-gray-900 dark:text-gray-200',
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
