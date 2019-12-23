import { Injectable } from '@angular/core';
import {UserModel} from '../../../shared/models/user.model';
import {Observable} from 'rxjs';
import {AbstractAuthService} from './abstract-auth.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {LocationService} from './location/location.service';
import {IpDataInterface} from '../interfaces/location/ip-data.interface';

@Injectable()
export class RegistrationService extends AbstractAuthService {

    private readonly REGISTER_URL = environment.backend.api_register_url;

    constructor(protected http: HttpClient, private locationService: LocationService) {
        super(http);
    }

    public register(user: UserModel): Observable<boolean> {
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

    private userToJson(user: UserModel, ipData: IpDataInterface): object {
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

