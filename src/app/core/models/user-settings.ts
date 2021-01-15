import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class UserSettings {
  @Expose() public id: number;
  @Expose() public units: number;
  @Expose() public language: string;
  @Expose() public currency: string;
  @Expose() public is_last_name_hidden: boolean;
}
