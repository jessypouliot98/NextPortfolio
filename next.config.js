/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  publicRuntimeConfig: {
    GOOGLE_MEASUREMENT_ID: process.env.GOOGLE_MEASUREMENT_ID,
  },
  experimental: {
    esmExternals: false, // Required because SyntaxHighlighter would fail import otherwise
  },
  i18n: require('./next-i18next.config').i18n,
  images: {
    domains: ['images.ctfassets.net'],
  },
  rewrites: require('./.nextConfig/rewrites'),
};

module.exports = nextConfig;
