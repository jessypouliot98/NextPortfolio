import { NextRouter } from "next/router";

import { AppLanguage } from './../store/application/types';

// TODO Refactor this file

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
      href: { en: '/', fr: '/' }[lang],
    }; 
  };

  export const getProjectList = (lang: AppLanguage, query?: { filter: string }) => {
    return {
      href: urlWithQuery({ en: '/projects', fr: '/projets' }[lang], query),
    };
  };

  export const getProjectSingle = (lang: AppLanguage, slug: string) => {
    return {
      href: `${getProjectList(lang).href}/${slug}`,
    };
  };
}
