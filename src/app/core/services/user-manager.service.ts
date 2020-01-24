import {Injectable} from '@angular/core';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {User} from '@app/shared/models/user';
import {Observable, of} from 'rxjs';
import {ApiClientService} from '@app/core/services/api-client.service';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    private user: UserInterface;

    constructor(private api: ApiClientService) {
        // const user: UserInterface = new User();
        // const settings: SettingsInterface = {
        //     location: 'Moscow',
        //     autoLocation: true,
        //     push: true
        // };
        // user.settings = settings;
        //
        // this.user = user;
    }

    public getUser(): Observable<UserInterface> {
        return this.api.get<User>('/user');
    }

    public updateUser(user: UserInterface): void {
        this.user = user;
    }

}
