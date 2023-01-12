import { z } from "zod";

import { Route } from "@/utils/navigation/types";

export const parseRoute = <R extends Route = Route>(
  route: R,
  routeParams: z.infer<R['routeParams']>,
  queryParams: z.infer<R['queryParams']>,
) => {
  return {
    routeParams: route.routeParams.parse(routeParams),
    queryParams: route.queryParams.parse(queryParams),
  };
};