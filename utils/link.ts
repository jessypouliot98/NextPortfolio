import { NextRouter } from "next/router";

import { AppLanguage } from "@/store/application/types";

import routes from '../nextConfig/routes';

// TODO Refactor this file

export const getIsHomeActive = (router: NextRouter) => {
  return router.pathname === '/';
};

export const getIsActive = (router: NextRouter, path: string) => {
  return router.pathname.includes(path);
};

export const getRouteByAlias = (
  routeAlias: string,
  options?: {
    lang?: AppLanguage,
    params?: Record<string, string>,
    query?: Record<string, string>
  }
) => {
  const appRoute = routes.find(({ alias }) => alias === routeAlias);

  if (!appRoute) {
    return;
  }

  return {
    alias: appRoute.alias,
    path: appRoute.destination,
    get href() {
      const lang = options?.lang || 'en';
      let path = appRoute.variants[lang];

      Object.entries(options?.params || {}).forEach(([key, value]) => {
        const findKeyRegExp = new RegExp(`\\[${key}\\]`, 'gi');
        path = path.replace(findKeyRegExp, value);
      });

      path = urlWithQuery(path, options?.query || {});

      return path;
    }
  };
};

export const getRouteByPath = (
  routePath: string,
  options?: {
    lang?: AppLanguage,
    params?: Record<string, string>,
    query?: Record<string, string>
  }
) => {
  const appRoute = routes.find(({ destination }) => destination === routePath);

  if (!appRoute) {
    return;
  }

  return getRouteByAlias(appRoute?.alias, options);
};

export const urlWithQuery = (url: string, query: Record<string, string>) => {
  if (Object.keys(query).length === 0) {
    return url;
  }

  const queryString = new URLSearchParams(query);

  return `${url}?${queryString}`;
};

type RouteOptions<P extends {} = never, Q extends {} = never> = {
  lang?: AppLanguage,
  params?: P,
  query?: Q,
}

export namespace Routes {
  export const getHome = () => {
    return getRouteByAlias('home')!; 
  };

  export const getProjectList = (options?: RouteOptions<never, { filter?: string }>) => {
    return getRouteByAlias('project-list', options)!;
  };

  export const getProjectSingle = (options: RouteOptions<{ slug: string }>) => {
    return getRouteByAlias('project-single', options)!;
  };
}
