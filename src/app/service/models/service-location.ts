import { Expose } from 'class-transformer';

export class ServiceLocation {
  /* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
  @Expose() public id: number;
  @Expose() public service: number;
  @Expose() public location: number;
  @Expose() public max_distance: number;
}
