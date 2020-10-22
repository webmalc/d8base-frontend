import {Country} from '@app/profile/models/country';
import {Expose} from 'class-transformer';
import {UserInterface} from '../interfaces/user.interface';

// tslint:disable:variable-name
export class User implements UserInterface {
    @Expose() public id: number;
    @Expose() public first_name: string;
    @Expose() public last_name: string;
    @Expose() public patronymic?: string;
    @Expose() public password?: string;
    @Expose() public password_confirm?: string;
    @Expose() public email: string;
    @Expose() public phone: string;
    @Expose() public avatar: string;
    @Expose() public avatar_thumbnail: string;
    @Expose() public gender: boolean;
    @Expose() public birthday: string;
    @Expose() public nationality: number | Country;
    @Expose() public main_language: string;
    @Expose() public languages?: string[];
    @Expose() public account_type: string;
    @Expose() public is_confirmed: boolean;
}
