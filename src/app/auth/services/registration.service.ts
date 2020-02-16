import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {LocationService} from '@app/core/services/location/location.service';
import {environment} from '../../../environments/environment';
import {User} from '@app/shared/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';
import {classToPlain, plainToClass, plainToClassFromExist} from 'class-transformer';
import {catchError, switchMap} from 'rxjs/operators';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {LocationModel} from '@app/core/models/location.model';
import {LocationApiService} from '@app/core/services/location/location-api.service';

@Injectable()
export class RegistrationService {

    private readonly REGISTER_URL = environment.backend.api_register_url;

    constructor(
        protected client: ApiClientService,
        private locationService: LocationService,
        private locationApiService: LocationApiService
    ) { }

    public register(user: User, location: LocationModel): Observable<boolean> {
        return this.client.post<UserInterface>(this.REGISTER_URL, classToPlain(user)).pipe(
            switchMap(
                (newUser: UserInterface) => {
                    return from(this.locationService.getMergedLocationData()).pipe(
                        switchMap(
                            (ipLocation: LocationModel) => {
                                const merged: LocationModel = plainToClassFromExist(location, ipLocation);
                                return this.locationApiService.saveLocation(merged, plainToClass(User, newUser)).pipe(
                                    switchMap(
                                        result => of(true)
                                    )
                                );
                            }
                        )
                    );
                }
            ),
            catchError(
                err => of(err)
            )
        );
    }
}

