import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {User} from '@app/shared/models/user';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    constructor(private api: ApiClientService) {
    }

    public getUser(id: number): Observable<User> {
        return this.api.get<User>(`${environment.backend.users}/${id}`)
            .pipe(
                map((user: User) => plainToClass(User, user))
            );

    }

    public updateUser(user: UserInterface): Observable<User> {
        return this.api.patch<User>(`${environment.backend.users}/${user.id}`, user);
    }
}
