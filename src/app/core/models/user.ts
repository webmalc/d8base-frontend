import {Expose} from 'class-transformer';
import {UserInterface} from '../interfaces/user.interface';

export class User implements UserInterface {
    @Expose() public id?: number;
    @Expose() public firstName: string;
    @Expose() public lastName: string;
    @Expose() public patronymic?: string;
    @Expose() public password?: string;
    @Expose() public email: string;
    @Expose() public phone: string;
    @Expose() public avatar?: string;
    @Expose() public gender: string;
    @Expose() public age?: number;
    @Expose() public main_language: string;
    @Expose() public languages?: string[];
    @Expose() public type_of_user: string;
}
