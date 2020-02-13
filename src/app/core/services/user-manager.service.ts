import {Injectable} from '@angular/core';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {User} from '@app/shared/models/user';
import {Observable} from 'rxjs';
import {ApiClientService} from '@app/core/services/api-client.service';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    private user: UserInterface;

    constructor(private api: ApiClientService) {
    }

    public getUser(id: number): Observable<User> {
        return this.api.get<User>(`${environment.backend.api_users}/${id}`)
            .pipe(
                map((user: User) => plainToClass(User, user))
            );

    }

    public updateUser(user: UserInterface): Observable<UserInterface> {
        return this.api.patch<User>(`${environment.backend.api_users}/${user.id}`, user);
    }



}
