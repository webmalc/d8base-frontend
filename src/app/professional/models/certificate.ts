import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class Certificate {
  @Expose() public id: number;
  @Expose() public professional: number;
  @Expose() public name: string;
  @Expose() public organization: string;
  @Expose() public date: string;
  @Expose() public certificate_id: string;
  @Expose() public url: string;
  @Expose() public photo: string;
  @Expose() public photo_thumbnail: string;
}
