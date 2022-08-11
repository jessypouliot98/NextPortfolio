import React from "react";
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import '@/styles/globals.css';

export type MyAppProps = AppProps

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props;

  return (
    <Component {...pageProps} />
  );
};

export default appWithTranslation(MyApp);
