import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractAuthService} from './abstract-auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LocationService} from './location/location.service';
import {IpDataInterface} from '../interfaces/location/ip-data.interface';
import {environment} from '../../../environments/environment';
import {User} from '@app/shared/models/user';

@Injectable()
export class RegistrationService extends AbstractAuthService {

    private readonly REGISTER_URL = environment.backend.api_register_url;

    constructor(protected http: HttpClient, private locationService: LocationService) {
        super(http);
    }

    public register(user: User): Observable<boolean> {
        return new Observable<boolean>(
            subscriber => {
                this.locationService.getIpData().then(
                    (data: IpDataInterface | null) => {
                        console.log(this.userToJson(user, data));
                        this.post(this.userToJson(user, data), this.REGISTER_URL).subscribe(
                            resp => {
                                subscriber.next(true);
                                subscriber.complete();
                            },
                            (err: HttpErrorResponse) => {
                                subscriber.error(err);
                            }
                        );
                    }
                );
            }
        );
    }

    private userToJson(user: User, ipData: IpDataInterface): object {
        return {
            email: user.email,
            password: user.password,
            name: user.name,
            phone: user.phone,
            country: user.country,
            city: user.city,
            county_code: ipData.country_code,
            postal_code: ipData.postal_code,
            ip: ipData.ip
        };
    }
}

