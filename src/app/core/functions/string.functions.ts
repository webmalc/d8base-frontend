const SEPARATOR = ',';

export function normalizeString(value: string): string {
  return value.trim().toLowerCase();
}

export function toNumber(value: string): number {
  return Number.parseInt(value, 10);
}

export function toArray(value: string): string[] {
  return value.split(SEPARATOR);
}

export function fromArray(value: string[]): string {
  return value.join(SEPARATOR);
}
