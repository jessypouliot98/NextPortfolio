import { z, ZodObject } from "zod";

import { getRoute } from "@/utils/navigation/getRoute";
import { Route } from "@/utils/navigation/types";

const createRoute = <
  R extends Route['routeParams'] = ZodObject<{}>,
  Q extends Route['queryParams'] = ZodObject<{}>,
>(route: Omit<Route<R, Q>, 'routeParams' | 'queryParams'> & Partial<Pick<Route<R, Q>, 'routeParams' | 'queryParams'>>) => getRoute({
  ...route,
  routeParams: route.routeParams ?? z.object({}),
  queryParams: route.queryParams ?? z.object({}),
} as Route<R, Q>);

export const ROUTES = {
  'home': createRoute({
    path: '/',
    i18n: {
      path: {
        en: '/',
        fr: '/fr',
      },
    },
  }),
  'projects': createRoute({
    path: '/projects',
    i18n: {
      path: {
        en: '/projects',
        fr: '/fr/projets',
      }
    },
  }),
  'projects.single': createRoute({
    path: '/projects/[slug]',
    i18n: {
      path: {
        en: '/projects/[slug]',
        fr: '/fr/projets/[slug]',
      }
    },
    routeParams: z.object({
      slug: z.string(),
    }),
  }),
  'blog': createRoute({
    path: '/blog',
    i18n: {
      path: {
        en: '/blog',
        fr: '/fr/blog',
      }
    },
  }),
  'blog.single': createRoute({
    path: '/projects/[slug]',
    i18n: {
      path: {
        en: '/blog/[slug]',
        fr: '/fr/blog/[slug]',
      }
    },
    routeParams: z.object({
      slug: z.string(),
    }),
  }),
  'hidden.cv': createRoute({
    path: '/hidden/cv',
    i18n: {
      path: {
        en: '/hidden/cv',
        fr: '/fr/hidden/cv',
      }
    },
  }),
  'hidden.preview.blog.single': createRoute({
    path: '/hidden/preview/blog/[contentfulEntryId]',
    i18n: {
      path: {
        en: '/hidden/preview/blog/[contentfulEntryId]',
        fr: '/fr/hidden/preview/blog/[contentfulEntryId]',
      }
    },
    routeParams: z.object({
      contentfulEntryId: z.string(),
    }),
  }),
};

