import { Injectable } from '@angular/core';
import { once } from '@app/core/decorators/once';
import { User } from '@app/core/models/user';
import { ApiClientService } from '@app/core/services/api-client.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { CountriesApiService } from '@app/core/services/location/countries-api.service';
import { UserLocationApiService } from '@app/core/services/location/user-location-api.service';
import { TypeOfUser } from '@app/profile/enums/type-of-user';
import { Country } from '@app/profile/models/country';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserManagerService {

    private user: User;
    private readonly url = environment.backend.user;

    constructor(
        private readonly api: ApiClientService,
        private readonly auth: AuthenticationService,
        private readonly userLocationApi: UserLocationApiService,
        private readonly countryApi: CountriesApiService,
    ) {
    }

    @once
    public subscribeToAuthSubject(): void {
        this.auth.isAuthenticated$.pipe(filter(isAuth => isAuth === false)).subscribe(
            _ => this.user = null,
        );
    }

    public getDefaultUserCountry(): Observable<Country> {
        return this.auth.isAuthenticated$.pipe(
            filter(isAuth => isAuth),
            switchMap(_ => this.userLocationApi.getDefaultLocation()),
            filter(location => (location && location.country && true)),
            switchMap(location => this.countryApi.getByEntityId(location.country as number)),
        );
    }

    public getCurrentUser(): Observable<User> {
        if (this.user) {
            return of(this.user);
        }

        return this.auth.isAuthenticated$.pipe(
            first(),
            switchMap(isAuth => isAuth ? this.getUser() : of(null)),
            tap((user: User) => this.user = user),
        );
    }

    public updateUser(user: Partial<User>): Observable<User> {
        return this.api.patch<User>(this.url, user).pipe(
            map(raw => plainToClass(User, raw)),
            tap(usr => this.user = usr),
        );
    }

    public becomeMaster(): Observable<User> {
        return this.updateUser({ account_type: TypeOfUser.Master});
    }

    private getUser(): Observable<User> {
        return this.api.get<User>(this.url)
            .pipe(map((user: User) => plainToClass(User, user)));
    }
}
