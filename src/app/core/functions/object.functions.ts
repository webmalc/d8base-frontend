export function hasNonEmptyValues(obj: object): boolean {
  return obj ? Object.values(obj).some(v => !!v) : false;
}
