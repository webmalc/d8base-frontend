import { Coords } from '@app/shared/interfaces/coords';

export function convertCoordsFromMap(mapCoords: number[]): Coords {
  let coords: Coords;

  if (mapCoords && mapCoords.length === 2) {
    coords = {
      latitude: mapCoords[1],
      longitude: mapCoords[0],
    };
  }

  return coords;
}

export function convertCoordsToMap(coords: Coords): number[] {
  return coords ? [coords.longitude, coords.latitude] : null;
}
