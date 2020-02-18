import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IpApiResponseInterface} from '@app/auth/interfaces/location/ip-api-response.interface';
import {LocationModel} from '@app/core/models/location.model';
import {AbstractIpService} from '@app/core/services/location/abstract-ip.service';

@Injectable()
export class IpApiService extends AbstractIpService {

    private readonly url = 'https://ipapi.co/json/';

    constructor(protected http: HttpClient) {
        super(http);
    }

    protected getUrl(): string {
        return this.url;
    }

    protected transform(res: IpApiResponseInterface): LocationModel {
        if (res.error) {
            throw Error;
        }
        const location = new LocationModel();
        location.postalCode = res.postal;
        location.countryCode = res.country_code;
        location.latitude = res.latitude;
        location.longitude = res.longitude;
        location.timezone = res.timezone;
        location.city = res.city;

        return location;
    }
}
