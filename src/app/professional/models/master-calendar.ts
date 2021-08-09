import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class MasterCalendar {
  @Expose() public start_datetime: string;
  @Expose() public end_datetime: string;
  @Expose() public professional: number;
  @Expose() public service: number;
}
