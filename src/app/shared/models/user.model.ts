import {UserInterface} from '../interfaces/user.interface';
import {LoginFormFields} from '../../core/auth/enums/login-form-fields';
import {RegistrationFormFields} from '../../core/auth/enums/registration-form-fields';

export class UserModel implements UserInterface {
    // tslint:disable:variable-name
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

    public static createFromLoginForm(data: object): UserModel {
        const newInstance = new UserModel();
        newInstance.username = data[LoginFormFields.Username];
        newInstance.password = data[LoginFormFields.Password];

        return newInstance;
    }

    public static createFromRegistrationForm(data: object): UserModel {
        const newInstance = new UserModel();
        newInstance.email = data[RegistrationFormFields.Email];
        newInstance.password = data[RegistrationFormFields.Password];
        newInstance.name = data[RegistrationFormFields.Name];
        newInstance.phone = data[RegistrationFormFields.Phone];
        newInstance.country = data[RegistrationFormFields.Country];
        newInstance.city = data[RegistrationFormFields.City];

        return newInstance;
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
