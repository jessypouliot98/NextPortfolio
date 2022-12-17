import { ROUTES } from "./routes";

describe('routes', () => {
  it('home route returns expected url', () => {
    expect(ROUTES['home'].url('en')).toBe('/');
    expect(ROUTES['home'].url('fr')).toBe('/fr');
  });

  it('projects route returns expected url', () => {
    expect(ROUTES['projects'].url('en', {}, { filter: 'renorun' })).toBe('/projects?filter=renorun');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(ROUTES['projects'].url('en', {}, { invalid: 'foobar' })).toBe('/projects');
    expect(ROUTES['projects'].url('fr')).toBe('/fr/projets');
  });
});