import { Expose } from 'class-transformer';

// tslint:disable:variable-name
export class MasterCalendar {
    @Expose() public start_datetime: string;
    @Expose() public end_datetime: string;
    @Expose() public professional: number;
    @Expose() public service: number;
}
