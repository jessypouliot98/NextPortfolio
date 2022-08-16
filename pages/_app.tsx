import React from "react";
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { AnimatePresence } from "framer-motion";

import '@/styles/globals.css';

export type MyAppProps = AppProps

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props;

  return (
    <AnimatePresence
      initial={false}
    >
      <Component {...pageProps} />
    </AnimatePresence>
  );
};

export default appWithTranslation(MyApp);
