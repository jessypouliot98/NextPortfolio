export function entries<T extends object>(o: T) {
  return Object.entries(o) as Array<[keyof T, T[keyof T]]>;
}