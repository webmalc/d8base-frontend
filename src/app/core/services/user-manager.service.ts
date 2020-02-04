import {Injectable} from '@angular/core';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {User} from '@app/shared/models/user';
import {Observable} from 'rxjs';
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

    public getUser(id: string): Observable<User> {
        return this.api.get<User>(`users/${id}.json`);
    }

    public updateUser(user: UserInterface): Observable<UserInterface> {
        return this.api.post<User>('users', user);
    }

}
