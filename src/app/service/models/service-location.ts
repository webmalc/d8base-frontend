import { Expose } from 'class-transformer';

export class ServiceLocation {
  // tslint:disable:variable-name
  @Expose() public id: number;
  @Expose() public service: number;
  @Expose() public location: number;
  @Expose() public max_distance: number;
}
