import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class UserLanguage {
  @Expose() public id: number;
  @Expose() public language: string;
  @Expose() public is_native: boolean;
}
