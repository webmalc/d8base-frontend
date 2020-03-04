import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {User} from '@app/shared/models/user';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    constructor(private api: ApiClientService, private authFactory: AuthenticationFactory) {
    }

    public getCurrentUser(): Observable<User> {
        return this.authFactory.getAuthenticator().getUserId().pipe(
            switchMap(
                (userId: number) => {
                    return this.getUser(userId);
                }
            )
        );
    }

    public getUser(id: number): Observable<User> {
        return this.api.get<User>(`${environment.backend.user}/${id}`)
            .pipe(
                map((user: User) => plainToClass(User, user))
            );

    }

    public updateUser(user: UserInterface): Observable<User> {
        return this.api.patch<User>(`${environment.backend.user}/${user.id}`, user);
    }
}
