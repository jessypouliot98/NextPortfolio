import { NextRouter } from "next/router";

import { AppLanguage } from "../types";

type AppRoute = {
  path: string,
  href: string,
  localizedHref: string,
}

export const getIsHomeActive = (router: NextRouter) => {
  return router.pathname === '/';
};

export const getIsActive = (router: NextRouter, path: string) => {
  return router.pathname.includes(path);
};

export const urlWithQuery = (url: string, query?: Record<string, string | number>) => {
  if (!query || Object.keys(query).length === 0) {
    return url;
  }

  const queryString = new URLSearchParams(query as any);

  return `${url}?${queryString}`;
};

export const getAlternateRoute = (router: NextRouter, alternateLang: AppLanguage) => {
  let alternateRoute = Routes.getHome(alternateLang);

  Object.values(Routes).forEach((getRoute) => {
    const r = getRoute(alternateLang, router.query as any);

    if (r.path === router.route) {
      alternateRoute = r;
    }
  });

  return alternateRoute;
};

export namespace Routes {
  export const getHome = (lang: AppLanguage): AppRoute => {
    return {
      path: '/',
      href: '/',
      localizedHref: {
        en: '/',
        fr: '/fr',
      }[lang],
    };
  };

  export const getContact = (_lang: AppLanguage): AppRoute => {
    return {
      path: '@@@',
      href: 'mailto:jessypouliot98@gmail.com',
      localizedHref: 'mailto:jessypouliot98@gmail.com',
    };
  };

  export const getProjectList = (lang: AppLanguage, query?: { filter: string }): AppRoute => {
    return {
      path: '/projects',
      href: urlWithQuery({ en: '/projects', fr: '/projets' }[lang], query),
      localizedHref: {
        en: urlWithQuery('/projects', query),
        fr: `/fr${urlWithQuery('/projets', query)}`,
      }[lang],
    };
  };

  export const getProjectSingle = (lang: AppLanguage, query: { slug: string }): AppRoute => {
    const { slug } = query;
    const projectListRoute = getProjectList(lang);

    return {
      path: `${projectListRoute.path}/[slug]`,
      href: `${projectListRoute.href}/${slug}`,
      localizedHref: `${projectListRoute.localizedHref}/${slug}`,
    };
  };

  export const getBlogList = (lang: AppLanguage): AppRoute => {
    return {
      path: '/blog',
      href: '/blog',
      localizedHref: {
        en: '/blog',
        fr: '/fr/blog',
      }[lang],
    };
  };

  export const getBlogSingle = (lang: AppLanguage, query: { slug: string }): AppRoute => {
    const { slug } = query;
    const blogListRoute = getBlogList(lang);

    return {
      path: `${getBlogList(lang).path}/[slug]`,
      href: `${getBlogList(lang).href}/${slug}`,
      localizedHref: `${blogListRoute.localizedHref}/${slug}`,
    };
  };

  export const getCVPage = (lang: AppLanguage): AppRoute => {
    return {
      path: '/hidden/cv',
      href: '/hidden/cv',
      localizedHref: {
        en: '/hidden/cv',
        fr: '/fr/hidden/cv',
      }[lang],
    };
  };

  export const getPdfCV = (lang: AppLanguage): AppRoute => {
    return {
      path: '/api/pdf/cv',
      href: urlWithQuery('/api/pdf/cv', { lang }),
      localizedHref: urlWithQuery('/api/pdf/cv', { lang }),
    };
  };
}
