import { NextRouter } from "next/router";

import { ROUTES,ROUTES_PATH_MAP } from "@/utils/navigation/routes";

import { AppLanguage } from "@/types";

export const getMatchingRoute = (router: NextRouter) => {
  return ROUTES_PATH_MAP.get(router.pathname);
};

export const getMatchingRouteUrl = (lang: AppLanguage, router: NextRouter) => {
  const matchingRoute = getMatchingRoute(router) ?? ROUTES['home'];

  return matchingRoute.url(
    lang,
    router.query as any, // Notice: NextJS merges both route & query params
    router.query as any, // Notice: NextJS merges both route & query params
  );
};