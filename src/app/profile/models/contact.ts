import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class Contact {
  @Expose() public id: number;
  @Expose() public name: string;
  @Expose() public code: string;
  @Expose() public is_default: boolean;
  @Expose() public countries: string[];
  @Expose() public excluded_countries: string[];
}
