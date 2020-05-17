import {Injectable} from '@angular/core';
import {RegistrationResponseInterface} from '@app/auth/interfaces/registration-response.interface';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationApiService} from '@app/core/services/location/location-api.service';
import {LocationService} from '@app/core/services/location/location.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {from, Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class RegistrationService {

    private readonly REGISTER_URL = environment.backend.register;
    private readonly SEND_VERITY_REGISTRATION = environment.backend.send_verify_registration;

    constructor(
        protected client: ApiClientService,
        private locationService: LocationService,
        private locationApiService: LocationApiService,
        private tokenManager: TokenManagerService
    ) {
    }

    public register(user: User, location: UserLocation): Observable<User> {
        return this.client.post<RegistrationResponseInterface>(this.REGISTER_URL, user).pipe(
            switchMap(
                async (newUser: RegistrationResponseInterface) => {
                    await this.tokenManager.setTokens(newUser.token);
                    this.sendVerifyLink().subscribe();

                    return from(this.locationService.getMergedLocationData()).pipe(
                        switchMap(
                            (geoposition: UserLocation) => {
                                if (null !== geoposition) {
                                    location.coordinates = geoposition.coordinates;
                                }

                                return this.locationApiService.saveLocation(location).pipe(
                                    switchMap(
                                        _ => of(newUser)
                                    )
                                );
                            }
                        ),
                        catchError(
                            e => of(newUser)
                        )
                    );
                }
            ),
            catchError(
                err => of(err)
            )
        );
    }

    private sendVerifyLink(): Observable<any> {
        return this.client.post(this.SEND_VERITY_REGISTRATION);
    }
}

