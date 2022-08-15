import getConfig from "next/config";
import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const { GOOGLE_MEASUREMENT_ID } = getConfig().publicRuntimeConfig;

const MyDocument = () => {
  return (
    <Html>
        <Head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}`}
            strategy={'afterInteractive'}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GOOGLE_MEASUREMENT_ID}');
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
  );
};

export default MyDocument;