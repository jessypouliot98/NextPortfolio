export function assertDefined<T>(v: T | undefined | null): asserts v is T {
  if (v == undefined) {
    throw new Error("Expected variable to be defined");
  }
}