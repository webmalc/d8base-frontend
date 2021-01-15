import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class MasterPhoto {
  @Expose() public id: number;
  @Expose() public professional: number;
  @Expose() public name: string;
  @Expose() public description: string;
  @Expose() public order: number;
  @Expose() public created: string;
  @Expose() public photo: string;
  @Expose() public photo_thumbnail: string;
}
