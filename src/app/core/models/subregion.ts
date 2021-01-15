import { Expose } from 'class-transformer';

export class Subregion {
  /* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
  @Expose() public id: number;
  @Expose() public slug: string;
  @Expose() public name: string;
  @Expose() public name_std: string;
  @Expose() public alt_names: [number];
  @Expose() public code: string;
  @Expose() public region: number;
}
