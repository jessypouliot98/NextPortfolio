import React from "react";
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from "framer-motion";

import '@/styles/globals.css';

const queryClient = new QueryClient();

export type MyAppProps = AppProps;

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp);
