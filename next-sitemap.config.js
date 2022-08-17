const routes = require('./.nextConfig/routes');
const defaultLocale = require('./next-i18next.config').i18n.defaultLocale;

const removePathParams = (path) => {
  return path.replace(/\/:\w.+/, '');
};

const getLocalizedUrl = (url) => {
  let mappedUrl = url;

  routes.forEach((route) => {
    const path = removePathParams(route.destination);

    if (!mappedUrl.includes(path)) {
      return;
    }

    Object.entries(route.variants).forEach(([locale, variant]) => {
      const isLocalized = new RegExp(`^\\/${locale}\\/`).test(mappedUrl);

      if (locale === defaultLocale || !isLocalized) {
        return;
      }

      const variantPath = removePathParams(variant);
      mappedUrl = mappedUrl.replace(path, variantPath);
    });
  });

  return mappedUrl;
};

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  transform: (config, url) => {
    return {
      loc: getLocalizedUrl(url),
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};

module.exports = config;