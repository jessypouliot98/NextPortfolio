import React from "react";
import type { AppProps } from 'next/app';
import getConfig from "next/config";
import { appWithTranslation, useTranslation } from 'next-i18next';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/lib/theme";

import '@/styles/globals.css';

const { GOOGLE_RECAPTCHA_SITE_KEY } = getConfig().publicRuntimeConfig;
const queryClient = new QueryClient();

export type MyAppProps = AppProps;

const MyApp = (props: MyAppProps) => {
  const { Component, pageProps } = props;
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleReCaptchaProvider reCaptchaKey={GOOGLE_RECAPTCHA_SITE_KEY} language={i18n.language}>
        <ThemeProvider>
          <AnimatePresence initial={false}>
            <Component {...pageProps} />
          </AnimatePresence>
        </ThemeProvider>
      </GoogleReCaptchaProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp);
