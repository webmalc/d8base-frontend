import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class UserSettings {
    @Expose() public id: number;
    @Expose() public units: number;
    @Expose() public language: string;
    @Expose() public currency: string;
    @Expose() public is_last_name_hidden: boolean;
}
