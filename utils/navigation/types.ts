import { ZodNumber, ZodObject, ZodOptional, ZodString } from "zod";

type I18nMap<T> = {
  en: T;
  fr: T;
}

type ZodParam = ZodOptional<ZodString | ZodNumber> | ZodString | ZodNumber;
type ZodRouteParams = ZodObject<{ [key: string]: ZodParam }>;

export type Route<
  R extends ZodRouteParams = ZodRouteParams,
  Q extends ZodRouteParams = ZodRouteParams,
> = {
  path: string;
  i18n: {
    path: I18nMap<string>,
  },
  breadcrumbs: string[],
  routeParams: R;
  queryParams: Q;
}