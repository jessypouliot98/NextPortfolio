import { z } from "zod";

import { urlWithQuery } from "@/utils/link";
import { parseRoute } from "@/utils/navigation/parseRoute";
import { Route } from "@/utils/navigation/types";

import { AppLanguage } from "../../types";

export const getRoute = <R extends Route = Route>(route: R) => {
  return {
    ...route,
    title: null,
    url(
      lang: AppLanguage,
      routeParams: z.infer<R['routeParams']>,
      queryParams: z.infer<R['queryParams']>,
    )  {
      const parsed = parseRoute(route, routeParams, queryParams);

      return Object.entries(parsed.routeParams).reduce((builder, [key, value]) => {
        const regex = new RegExp(`\\[${key}\\]`, 'gi');

        return builder.replace(regex, value.toString());
      }, urlWithQuery(route.i18n.path[lang], parsed.queryParams));
    }
  };
};