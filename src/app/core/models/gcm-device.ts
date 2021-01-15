import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class GcmDevice {
  @Expose() public id: number;
  @Expose() public registration_id: string;
  @Expose() public device_id: number;
  @Expose() public active: boolean;
  @Expose() public date_created: string;
  @Expose() public cloud_message_type: string;
  @Expose() public application_id: string;
}
