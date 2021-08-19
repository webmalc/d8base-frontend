export function emptyArrayToUndefined<T>(arr?: T[]): T[] | undefined {
  return arr?.length ? arr : void 0;
}

export function arrayToString<T>(array?: T[]): string {
  return array?.join(',') ?? '';
}
