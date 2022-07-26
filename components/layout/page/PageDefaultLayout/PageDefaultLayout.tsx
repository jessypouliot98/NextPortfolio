import React, {useEffect} from "react";
import clsx from "clsx";
import {Footer, Header} from "../../../parts";

export type PageDefaultLayoutProps = {
  children: React.ReactNode,
}

export const PageDefaultLayout: React.FC<PageDefaultLayoutProps> = ({ children }) => {
  useEffect(() => {
    window.document.body.classList.toggle('dark', true);
  });

  return (
    <div className={clsx(
      'relative min-h-screen',
      'bg-gray-100 dark:bg-gray-800',
      'text-gray-900 dark:text-gray-300',
    )}>
      <Header />
      <main className={clsx('p-5 w-full h-full max-w-[1024px] m-auto')}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
