import {UserInterface} from '../interfaces/user.interface';
import {LoginFormFields} from '@app/auth/enums/login-form-fields';
import {RegistrationFormFields} from '@app/auth/enums/registration-form-fields';
import SettingsInterface from '@app/shared/interfaces/settings.interface';

export class User implements UserInterface {
    // tslint:disable:variable-name
    private _id?: number | null;
    private _ip: string | null;
    private _postal_code: string | null;
    private _username: string | null;
    private _password: string | null;
    private _access_token: string | null;
    private _city: string | null;
    private _country: string | null;
    private _email: string | null;
    private _phone: string | null;
    private _refresh_token: string | null;
    private _name: string | null;
    private _county_code: string;
    private _avatar: string | null;
    private _settings: SettingsInterface | null;

    get id(): number | null {
        return this._id;
    }

    set id(value: number | null) {
        this._id = value;
    }

    get username(): string {
        return this._username;
    }
    set username(value: string) {
        this._username = value;
    }
    get password(): string {
        return this._password;
    }
    set password(value: string) {
        this._password = value;
    }
    get access_token(): string | null {
        return this._access_token;
    }
    set access_token(value: string | null) {
        this._access_token = value;
    }
    get city(): string | null {
        return this._city;
    }
    set city(value: string | null) {
        this._city = value;
    }
    get country(): string | null {
        return this._country;
    }
    set country(value: string | null) {
        this._country = value;
    }
    get county_code(): string {
        return this._county_code;
    }
    set county_code(value: string) {
        this._county_code = value;
    }
    get email(): string | null {
        return this._email;
    }
    set email(value: string | null) {
        this._email = value;
    }
    get phone(): string | null {
        return this._phone;
    }
    set phone(value: string | null) {
        this._phone = value;
    }
    get refresh_token(): string | null {
        return this._refresh_token;
    }
    set refresh_token(value: string | null) {
        this._refresh_token = value;
    }
    get postal_code(): string {
        return this._postal_code;
    }
    set postal_code(value: string) {
        this._postal_code = value;
    }
    get ip(): string {
        return this._ip;
    }
    set ip(value: string) {
        this._ip = value;
    }
    get name(): string | null {
        return this._name;
    }
    set name(value: string | null) {
        this._name = value;
    }

    get avatar(): string | null {
        return this._avatar;
    }

    set avatar(value: string | null) {
        this._avatar = value;
    }

    get settings(): SettingsInterface | null {
        return this._settings;
    }

    set settings(value: SettingsInterface | null) {
        this._settings = value;
    }

    public toJson(): object {
        return {
            name: this.name,
            password: this.password,
            username: this.username,
            access_token: this.access_token,
            refresh_token: this.refresh_token,
            email: this.email,
            phone: this.phone,
            country: this.country,
            ip: this.ip,
            postal_code: this.postal_code,
            country_code: this.county_code
        };
    }
}
