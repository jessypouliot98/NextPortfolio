import { NextRouter } from "next/router";

import { AppLanguage } from "../types";

export const getIsHomeActive = (router: NextRouter) => {
  return router.pathname === '/';
};

export const getIsActive = (router: NextRouter, path: string) => {
  return router.pathname.includes(path);
};

export const urlWithQuery = (url: string, query?: Record<string, string>) => {
  if (!query || Object.keys(query).length === 0) {
    return url;
  }

  const queryString = new URLSearchParams(query as any);

  return `${url}?${queryString}`;
};

export namespace Routes {
  export const getHome = (lang: AppLanguage) => {
    return {
      path: '/',
      href: '/',
      localizedHref: {
        en: '/',
        fr: '/fr',
      }[lang],
    };
  };

  export const getContact = (_lang: AppLanguage) => {
    return {
      path: '@@@',
      href: 'mailto:jessypouliot98@gmail.com',
    };
  };

  export const getProjectList = (lang: AppLanguage, query?: { filter: string }) => {
    return {
      path: '/projects',
      href: urlWithQuery({ en: '/projects', fr: '/projets' }[lang], query),
      localizedHref: {
        en: urlWithQuery('/projects', query),
        fr: `/fr${urlWithQuery('/projets', query)}`,
      }[lang],
    };
  };

  export const getProjectSingle = (lang: AppLanguage, slug: string) => {
    const projectListRoute = getProjectList(lang);

    return {
      path: `${projectListRoute.path}/[slug]`,
      href: `${projectListRoute.href}/${slug}`,
      localizedHref: `${projectListRoute.localizedHref}/${slug}`,
    };
  };

  export const getBlogList = (lang: AppLanguage) => {
    return {
      path: '/blog',
      href: '/blog',
      localizedHref: {
        en: '/blog',
        fr: '/fr/blog',
      }[lang],
    };
  };

  export const getBlogSingle = (lang: AppLanguage, slug: string) => {
    const blogListRoute = getBlogList(lang);

    return {
      path: `${getBlogList(lang).path}/[slug]`,
      href: `${getBlogList(lang).href}/${slug}`,
      localizedHref: `${blogListRoute.localizedHref}/${slug}`,
    };
  };

  export const getCVPage = (lang: AppLanguage) => {
    return {
      path: '/hidden/cv',
      href: '/hidden/cv',
      localizedHref: {
        en: '/hidden/cv',
        fr: '/fr/hidden/cv',
      }[lang],
    };
  };

  export const getPdfCV = (lang: AppLanguage) => {
    return {
      path: '/api/pdf/cv',
      href: urlWithQuery('/api/pdf/cv', { lang }),
    };
  };
}
