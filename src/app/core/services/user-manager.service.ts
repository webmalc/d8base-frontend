import {Injectable} from '@angular/core';
import {User} from '@app/core/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {plainToClass} from 'class-transformer';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    private user: User;

    constructor(private api: ApiClientService, private authFactory: AuthenticationFactory) {
    }

    public getCurrentUser(): Observable<User> {
        if (this.user) {
            return of(this.user);
        }

        return this.authFactory.getAuthenticator().getUserId().pipe(
            switchMap((userId: number) => {
                return this.getUser(userId).pipe(
                    tap((user: User) => this.user = user)
                );
            })
        );
    }

    public getUser(id: number): Observable<User> {
        return this.api.get<User>(`${environment.backend.user}/${id}`)
            .pipe(map((user: User) => plainToClass(User, user)));
    }

    public updateUser(user: User): Observable<User> {
        return this.api.patch<User>(`${environment.backend.user}/${user.id}`, user);
    }
}
