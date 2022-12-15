import { z } from "zod";

import { getRoute } from "@/utils/navigation/getRoute";
import { Route } from "@/utils/navigation/types";

import { AppLanguage } from "../../types";
import { ROUTES } from "./routes";

type TestCase<
  R extends Route['routeParams'] = Route['routeParams'],
  Q extends Route['queryParams'] = Route['queryParams'],
> = {
  route: Route<R, Q>;
  r: z.infer<R>;
  q: z.infer<Q>;
  expected: string;
}

const TEST_CASES: TestCase[] = [
  {
    route: ROUTES['home'],
    r: {},
    q: {},
    expected: '/',
  },
  {
    route: ROUTES['hidden.preview.blog.single'],
    r: { contentfulEntryId: 'foobar' },
    q: {},
    expected: '/',
  },
];

describe('routes', () => {
  const lang: AppLanguage = 'en';

  it.each(TEST_CASES)('returns expected url', ({ route, r, q, expected }) => {
    expect(getRoute(route).url(lang, r, q)).toBe(expected);
  });
});