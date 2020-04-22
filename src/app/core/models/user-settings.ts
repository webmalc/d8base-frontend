import {Expose} from 'class-transformer';

export class UserSettings {
    @Expose() public id?: number;
    @Expose() public language: string | string[];
    @Expose() public currency: string | string[];
}
