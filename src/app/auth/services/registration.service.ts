import {Injectable} from '@angular/core';
import {RegistrationResponseInterface} from '@app/auth/interfaces/registration-response.interface';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {LocationService} from '@app/core/services/location/location.service';
import {UserLocationApiService} from '@app/core/services/location/user-location-api.service';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable()
export class RegistrationService {

    private readonly REGISTER_URL = environment.backend.register;

    constructor(
        protected client: ApiClientService,
        private readonly locationService: LocationService,
        private readonly locationApiService: UserLocationApiService,
        private readonly authenticationService: AuthenticationService
    ) {
    }

    public register(user: User, location?: UserLocation): Observable<User> {
        return new Observable<User>(subscriber => this.client.post<RegistrationResponseInterface, User>(this.REGISTER_URL, user).subscribe(
            (newUser: RegistrationResponseInterface) => this.authenticationService.authenticateWithToken(newUser.token).then(
                _ => {
                    if (!location) {
                        subscriber.next(newUser as User);
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
                                    subscriber.next(newUser as User);
                                    subscriber.complete();
                                },
                                err => {
                                    subscriber.next(newUser as User);
                                    subscriber.complete();
                                }
                            );
                        }
                    );
                }
            )
        ));
    }
}

