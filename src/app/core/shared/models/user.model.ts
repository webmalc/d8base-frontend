import {UserInterface} from '../interfaces/user.interface';

export class UserModel implements UserInterface{
    private _username: string;
    private _password: string;

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
}
