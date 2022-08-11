import { AppLanguage } from "@/store/application/types";

import routes from '../nextConfig/routes';

const getCleanUrl = (url: string) => {
  return url.includes('?') ? url.substring(0, url.indexOf('?')) : url;
};

export const getIsHomeActive = (url: string, lang: AppLanguage) => {
  const homeUrl = Routes.getHome({ lang });

  return getCleanUrl(url) === homeUrl;
};

export const getIsActive = (url: string, route: string) => {
  return getCleanUrl(url).includes(route);
};

type BaseRouteParams = { lang: AppLanguage };

export const getRouteByAlias = <P extends BaseRouteParams = BaseRouteParams>(routeAlias: string, params: P) => {
  const { lang } = params;
  
  let route = routes.find(({ alias }) => alias === routeAlias)?.variants[lang] || '/';

  Object.entries(params).forEach(([key, value]) => {
    const findKeyRegex = new RegExp(`:${key}`, 'gi');
    route = route.replace(findKeyRegex, value);
  });

  return route;
};

export const urlWithQuery = (url: string, query: Record<string, string>) => {
  if (Object.keys(query).length === 0) {
    return url;
  }

  const queryString = new URLSearchParams(query);

  return `${url}?${queryString}`;
};

export namespace Routes {
  export const getHome = (params: BaseRouteParams) => {
    return getRouteByAlias('home', params); 
  };

  export const getProjectList = (params: BaseRouteParams, query: { filter?: string } = {}) => {
    return urlWithQuery(getRouteByAlias('project-list', params), query);
  };

  export const getProjectSingle = (params: BaseRouteParams & { slug: string }) => {
    return getRouteByAlias('project-single', params);
  };
}
