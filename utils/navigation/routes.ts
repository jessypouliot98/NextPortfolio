import { z } from "zod";

import { getRoute } from "@/utils/navigation/getRoute";
import { Route } from "@/utils/navigation/types";
import { urlWithQuery } from "@/utils/navigation/urlWithQuery";

const createRoute = <
  R extends Route['routeParams'] = Route['routeParams'],
  Q extends Route['queryParams'] = Route['routeParams'],
>(route: Omit<Route<R, Q>, 'routeParams' | 'queryParams'> & Partial<Pick<Route<R, Q>, 'routeParams' | 'queryParams'>>) => getRoute({
  ...route,
  routeParams: route.routeParams ?? z.object({}),
  queryParams: route.queryParams ?? z.object({}),
} as Route<R, Q>);

export const ROUTES = Object.freeze({
  'home': createRoute({
    path: '/',
    i18n: {
      path: {
        en: '/',
        fr: '/fr',
      },
    },
    breadcrumbs: [],
  }),
  'projects': createRoute({
    path: '/projects',
    i18n: {
      path: {
        en: '/projects',
        fr: '/fr/projets',
      }
    },
    breadcrumbs: ['home'],
    queryParams: z.object({
      filter: z.string().optional(),
    })
  }),
  'projects.single': createRoute({
    path: '/projects/[slug]',
    i18n: {
      path: {
        en: '/projects/[slug]',
        fr: '/fr/projets/[slug]',
      }
    },
    breadcrumbs: ['home', 'projects'],
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
    breadcrumbs: ['home'],
  }),
  'blog.single': createRoute({
    path: '/blog/[slug]',
    i18n: {
      path: {
        en: '/blog/[slug]',
        fr: '/fr/blog/[slug]',
      }
    },
    breadcrumbs: ['home', 'blog'],
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
    breadcrumbs: [],
  }),
  'hidden.preview.blog.single': createRoute({
    path: '/hidden/preview/blog/[contentfulEntryId]',
    i18n: {
      path: {
        en: '/hidden/preview/blog/[contentfulEntryId]',
        fr: '/fr/hidden/preview/blog/[contentfulEntryId]',
      }
    },
    breadcrumbs: ['home', 'blog'],
    routeParams: z.object({
      contentfulEntryId: z.string(),
    }),
  }),
  'api.pdf.cv': createRoute({
    path: '/api/pdf/cv',
    i18n: {
      path: {
        en: urlWithQuery('/api/pdf/cv', { lang: 'en' }),
        fr: urlWithQuery('/api/pdf/cv', { lang: 'fr' }),
      }
    },
    breadcrumbs: [],
  })
} as const);

export const ROUTES_PATH_MAP = new Map(Object.values(ROUTES).map((route) => ([
  route.path,
  route,
])));

