import {UserInterface} from '../interfaces/user.interface';
import {LoginFormFields} from '@app/auth/enums/login-form-fields';
import {RegistrationFormFields} from '@app/auth/enums/registration-form-fields';
import SettingsInterface from '@app/shared/interfaces/settings.interface';
import {Expose} from 'class-transformer';

export class User implements UserInterface {
    // tslint:disable:variable-name
    private _id?: number;
    private _firstName: string;
    private _lastName: string;
    private _patronymic?: string;
    private _password?: string;
    private _email: string;
    private _phone: string;
    private _avatar?: string;
    private _gender: string;
    private _age?: number;
    private _main_language: string;
    private _languages?: string[];
    private _type_of_user: string;

    get id(): number {
        return this._id;
    }

    @Expose() set id(value: number) {
        this._id = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    @Expose() set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    @Expose() set lastName(value: string) {
        this._lastName = value;
    }

    get patronymic(): string {
        return this._patronymic;
    }

    @Expose() set patronymic(value: string) {
        this._patronymic = value;
    }

    get password(): string {
        return this._password;
    }

    @Expose() set password(value: string) {
        this._password = value;
    }

    get email(): string {
        return this._email;
    }

    @Expose() set email(value: string) {
        this._email = value;
    }

    get phone(): string {
        return this._phone;
    }

    @Expose() set phone(value: string) {
        this._phone = value;
    }

    get avatar(): string {
        return this._avatar;
    }

    @Expose() set avatar(value: string) {
        this._avatar = value;
    }

    get gender(): string {
        return this._gender;
    }

    @Expose() set gender(value: string) {
        this._gender = value;
    }

    get age(): number {
        return this._age;
    }

    @Expose() set age(value: number) {
        this._age = value;
    }

    get main_language(): string {
        return this._main_language;
    }

    @Expose() set main_language(value: string) {
        this._main_language = value;
    }

    get languages(): string[] {
        return this._languages;
    }

    @Expose() set languages(value: string[]) {
        this._languages = value;
    }

    get type_of_user(): string {
        return this._type_of_user;
    }

    @Expose() set type_of_user(value: string) {
        this._type_of_user = value;
    }
}
