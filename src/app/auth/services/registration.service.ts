import {Injectable} from '@angular/core';
import {RegistrationResponseInterface} from '@app/auth/interfaces/registration-response.interface';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {LocationService} from '@app/core/services/location/location.service';
import {UserLocationApiService} from '@app/core/services/location/user-location-api.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class RegistrationService {

    private readonly REGISTER_URL = environment.backend.register;
    private readonly SEND_VERITY_REGISTRATION = environment.backend.send_verify_registration;

    constructor(
        protected client: ApiClientService,
        private readonly locationService: LocationService,
        private readonly locationApiService: UserLocationApiService,
        private readonly tokenManager: TokenManagerService,
        private readonly authenticationService: AuthenticationService
    ) {
    }

    public register(user: User, location?: UserLocation): Observable<User> {
        return new Observable<User>(subscriber => this.client.post<RegistrationResponseInterface>(this.REGISTER_URL, user).subscribe(
            (newUser: RegistrationResponseInterface) => this.authenticationService.authenticateWithToken(newUser.token).then(
                _ => {
                    if (!location) {
                        // @ts-ignore
                        subscriber.next(newUser);
                        subscriber.complete();

                        return;
                    }
                    this.locationService.getMergedLocationData().then(
                        (geoposition: UserLocation) => {
                            if (null !== geoposition) {
                                location.coordinates = geoposition.coordinates;
                            }
                            this.locationApiService.create(location).subscribe(
                                createdLocation => {
                                    // @ts-ignore
                                    subscriber.next(newUser);
                                    subscriber.complete();
                                },
                                err => {
                                    // @ts-ignore
                                    subscriber.next(newUser);
                                    subscriber.complete();
                                }
                            );
                        }
                    );
                }
            )
        ));
    }

    private sendVerifyLink(): void {
        this.client.post(this.SEND_VERITY_REGISTRATION, {}).subscribe();
    }
}

