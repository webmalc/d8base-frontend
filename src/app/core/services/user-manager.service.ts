import {Injectable} from '@angular/core';
import {UserInterface} from '@app/shared/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    private user: UserInterface;

    constructor() {
    }

    public getUser(): UserInterface {
        return this.user;
    }

    public updateUser(user: UserInterface): void {
    }

}
