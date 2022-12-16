import { ZodNumber, ZodObject, ZodString } from "zod";

type I18nMap<T> = {
  en: T;
  fr: T;
}

type ZodUrlParam = ZodString | ZodNumber;

export type Route<
  R extends ZodObject<Record<string, ZodUrlParam>> = ZodObject<Record<string, ZodUrlParam>>,
  Q extends ZodObject<Record<string, ZodUrlParam>> = ZodObject<Record<string, ZodUrlParam>>,
> = {
  path: string;
  i18n: {
    path: I18nMap<string>,
  },
  breadcrumbs: string[],
  routeParams: R;
  queryParams: Q;
}