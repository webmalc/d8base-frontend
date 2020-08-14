import {Injectable} from '@angular/core';
import {RegistrationResponseInterface} from '@app/auth/interfaces/registration-response.interface';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {LocationService} from '@app/core/services/location/location.service';
import {UserLocationApiService} from '@app/core/services/location/user-location-api.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {from, Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class RegistrationService {

    private readonly REGISTER_URL = environment.backend.register;
    private readonly SEND_VERITY_REGISTRATION = environment.backend.send_verify_registration;

    constructor(
        protected client: ApiClientService,
        private locationService: LocationService,
        private locationApiService: UserLocationApiService,
        private tokenManager: TokenManagerService,
        private authenticationService: AuthenticationService
    ) {
    }
    // TODO: check email verification request
    public register(user: User, location?: UserLocation): Observable<User> {
        // @ts-ignore
        return this.client.post<RegistrationResponseInterface>(this.REGISTER_URL, user).pipe(
            switchMap(
                (newUser: RegistrationResponseInterface) => {
                    return from(this.tokenManager.setTokens(newUser.token)).pipe(
                        switchMap(() => {
                            this.authenticationService.isAuthenticated$.next(true);
                            this.sendVerifyLink().subscribe();
                            if (!location) {
                                return of(newUser);
                            }

                            return from(this.locationService.getMergedLocationData()).pipe(
                                switchMap(
                                    (geoposition: UserLocation) => {
                                        if (null !== geoposition) {
                                            location.coordinates = geoposition.coordinates;
                                        }

                                        return this.locationApiService.create(location).pipe(
                                            map(
                                                _ => of(newUser)
                                            )
                                        );
                                    }
                                ),
                                catchError(
                                    e => of(newUser)
                                )
                            );
                        })
                    );
                }
            ),
            catchError(
                err => of(err)
            )
        );
    }

    private sendVerifyLink(): Observable<any> {
        return this.client.post(this.SEND_VERITY_REGISTRATION, {});
    }
}

