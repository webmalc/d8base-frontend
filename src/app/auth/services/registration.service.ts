import { Injectable } from '@angular/core';
import {LocationModel} from '@app/core/models/location.model';
import {User} from '@app/core/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationApiService} from '@app/core/services/location/location-api.service';
import {LocationService} from '@app/core/services/location/location.service';
import {classToPlain, plainToClass, plainToClassFromExist} from 'class-transformer';
import {from, Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {RegistrationResponseInterface} from '@app/auth/interfaces/registration-response.interface';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';

@Injectable()
export class RegistrationService {

    private readonly REGISTER_URL = environment.backend.register;

    constructor(
        protected client: ApiClientService,
        private locationService: LocationService,
        private locationApiService: LocationApiService,
        private tokenManager: TokenManagerService
    ) { }

    public register(user: User, location: LocationModel): Observable<User> {
        return this.client.post<RegistrationResponseInterface>(this.REGISTER_URL, user).pipe(
            tap(
                (data: RegistrationResponseInterface) => this.tokenManager.setTokens(data.token)
            ),
            // switchMap(
            //     (newUser: User) => {
            //         return from(this.locationService.getMergedLocationData()).pipe(
            //             switchMap(
            //                 (ipLocation: LocationModel) => {
            //                     const merged: LocationModel = plainToClassFromExist(location, ipLocation);
            //
            //                     return this.locationApiService.saveLocation(merged, plainToClass(User, newUser)).pipe(
            //                         switchMap(
            //                             result => of(true)
            //                         )
            //                     );
            //                 }
            //             )
            //         );
            //     }
            // ),
            catchError(
                err => of(err)
            )
        );
    }
}

