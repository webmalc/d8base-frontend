import {Injectable} from '@angular/core';
import {User} from '@app/core/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';
import {TypeOfUser} from '@app/profile/enums/type-of-user';
import {plainToClass} from 'class-transformer';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    private user: User;
    private readonly url = environment.backend.user;

    constructor(private api: ApiClientService) {
    }

    public getCurrentUser(): Observable<User> {
        if (this.user) {
            return of(this.user);
        }

        return this.getUser().pipe(
            tap((user: User) => this.user = user)
        );
    }

    public updateUser(user: Partial<User>): Observable<User> {
        return this.api.patch<User>(this.url, user).pipe(
            map(raw => plainToClass(User, raw))
        );
    }

    public becomeMaster(): Observable<User> {
        return this.updateUser({account_type: TypeOfUser.Master}).pipe(
            tap(user => this.user = user)
        );
    }

    private getUser(): Observable<User> {
        return this.api.get<User>(this.url)
            .pipe(map((user: User) => plainToClass(User, user)));
    }
}
