export function coordinatesToString(coordinates: { type: string; coordinates: number[] }): string {
  return `${coordinates.coordinates[1]},${coordinates.coordinates[0]}`;
}
