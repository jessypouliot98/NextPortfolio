export function getRouteTranslationKeyPath<S extends string = string>(path: S) {
  const key = path.split('/').join('.').replace(/^\.*/, '');

  if (key === '') {
    return 'main';
  }

  return `main.${key}`;
}