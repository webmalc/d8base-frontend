export function emptyArrayToUndefined<T>(arr: T[]): T[] | undefined {
  return arr?.length ? arr : void 0;
}
