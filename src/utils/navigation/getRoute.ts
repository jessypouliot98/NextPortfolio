import { NextRouter } from "next/router";
import { I18n } from "next-i18next";
import { z } from "zod";

import { getRouteTranslationKeyPath } from "@/utils/navigation/getRouteTranslationKeyPath";
import { parseRoute } from "@/utils/navigation/parseRoute";
import { Route } from "@/utils/navigation/types";
import { urlWithQuery } from "@/utils/navigation/urlWithQuery";

import { AppLanguage } from "@/types";

export const getRoute = <R extends Route = Route>(route: R) => {
  const namespace = 'navigation';
  const translationKeyPath = getRouteTranslationKeyPath(route.path);
  const titleTranslationKey = `${namespace}:${translationKeyPath}.title`;

  return {
    ...route,
    title: (i18n: I18n, i18nProps: any = {}) => i18n.t(titleTranslationKey, i18nProps),
    breadcrumbTitle: (i18n: I18n, i18nProps: any = {}) => {
      const breadcrumbTitleTranslationKey = `${namespace}:${translationKeyPath}.breadcrumbTitle`;

      if (i18n.exists(breadcrumbTitleTranslationKey)) {
        return i18n.t(breadcrumbTitleTranslationKey, i18nProps);
      }

      return i18n.t(titleTranslationKey, i18nProps);
    },
    getIsExactActive: (router: NextRouter) => {
      return router.pathname === route.path;
    },
    getIsActive: (router: NextRouter) => {
      return router.pathname.indexOf(route.path) === 0;
    },
    url: (
      lang: AppLanguage,
      routeParams: z.infer<R['routeParams']> = {},
      queryParams: z.infer<R['queryParams']> = {},
    ) => {
      const parsed = parseRoute(route, routeParams, queryParams);

      const url = Object.entries(parsed.routeParams).reduce((builder, [key, value]) => {
        const regex = new RegExp(`\\[${key}\\]`, 'gi');

        return builder.replace(regex, value?.toString() || '');
      }, urlWithQuery(route.i18n.path[lang], parsed.queryParams));

      if (lang !== 'en') {
        return `/${lang}${url}`;
      }

      return url;
    }
  };
};