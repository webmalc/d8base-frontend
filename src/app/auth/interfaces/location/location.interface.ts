import { Coords } from '@app/shared/interfaces/coords';

export interface LocationInterface extends Coords {
  postalCode: string;
  countryCode: string;
  city: string;
  regionCode?: string;
  timezone?: string;
}
