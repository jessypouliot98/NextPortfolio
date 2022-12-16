import { I18n } from "next-i18next";
import { z } from "zod";

import { urlWithQuery } from "@/utils/link";
import { getRouteTranslationKeyPath } from "@/utils/navigation/getRouteTranslationKeyPath";
import { parseRoute } from "@/utils/navigation/parseRoute";
import { Route } from "@/utils/navigation/types";

import { AppLanguage } from "@/types";

export const getRoute = <R extends Route = Route>(route: R) => {
  const translationKeyPath = getRouteTranslationKeyPath(route.path);
  const titleTranslationKey = `${translationKeyPath}.title`;
  
  return {
    ...route,
    title: (i18n: I18n) => i18n.t(titleTranslationKey),
    breadcrumbTitle: (i18n: I18n) => {
      const breadcrumbTitleTranslationKey = `${translationKeyPath}.breadcrumbTitle`;

      if (i18n.exists(breadcrumbTitleTranslationKey)) {
        return i18n.t(breadcrumbTitleTranslationKey);
      }

      return i18n.t(titleTranslationKey);
    },
    url: (
      lang: AppLanguage,
      routeParams: z.infer<R['routeParams']> = {},
      queryParams: z.infer<R['queryParams']> = {},
    ) => {
      const parsed = parseRoute(route, routeParams, queryParams);

      return Object.entries(parsed.routeParams).reduce((builder, [key, value]) => {
        const regex = new RegExp(`\\[${key}\\]`, 'gi');

        return builder.replace(regex, value.toString());
      }, urlWithQuery(route.i18n.path[lang], parsed.queryParams));
    }
  };
};