import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {LocationService} from './location/location.service';
import {IpDataInterface} from '../interfaces/location/ip-data.interface';
import {environment} from '../../../environments/environment';
import {User} from '@app/shared/models/user';
import {ApiClientService} from '@app/core/services/api-client.service';

@Injectable()
export class RegistrationService {

    private readonly REGISTER_URL = environment.backend.api_register_url;

    constructor(protected client: ApiClientService, private locationService: LocationService) { }

    public register(user: User): Observable<boolean> {
        return new Observable<boolean>(
            subscriber => {
                this.locationService.getIpData().then(
                    (data: IpDataInterface | null) => {
                        this.client.post(this.REGISTER_URL, this.userToJson(user, data)).subscribe(
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

