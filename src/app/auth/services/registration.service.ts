import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {LocationService} from './location/location.service';
import {IpDataInterface} from '../interfaces/location/ip-data.interface';
import {environment} from '../../../environments/environment';
import {User} from '@app/shared/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';
import {plainToClassFromExist, classToPlain} from 'class-transformer';
import {catchError, switchMap} from 'rxjs/operators';
import {UserInterface} from '@app/shared/interfaces/user.interface';

@Injectable()
export class RegistrationService {

    private readonly REGISTER_URL = environment.backend.api_register_url;

    constructor(protected client: ApiClientService, private locationService: LocationService) { }

    public register(user: User): Observable<boolean> {
        return this.combineWithIpData(user).pipe(
            switchMap(
                (combinedUser: UserInterface) => {
                    return this.client.post(this.REGISTER_URL, classToPlain(combinedUser)).pipe(
                        switchMap(
                            response => of(true)
                        ),
                        catchError(
                            err => of(err)
                        )
                    );
                }
            )
        );
    }

    private combineWithIpData(user: User): Observable<UserInterface> {
        return from(this.locationService.getIpData()).pipe(
            switchMap(
                (data: IpDataInterface | null) => {
                    if (null !== data) {
                        const combined: UserInterface = plainToClassFromExist(user, data);

                        return of(combined);
                    }

                    return of(user);
                }
            )
        );
    }
}

