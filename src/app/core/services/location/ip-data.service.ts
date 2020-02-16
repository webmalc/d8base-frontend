import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IpDataResponseInterface} from '@app/auth/interfaces/location/ip-data-response.interface';
import {LocationModel} from '@app/core/models/location.model';
import {AbstractIpService} from '@app/core/services/location/abstract-ip.service';

@Injectable()
export class IpDataService extends AbstractIpService {

    private readonly url = 'https://api.ipdata.co/?api-key=38d09cb1dc1cedbb96cc308e8723539bba0488876f5ccf85d4a8e6d7';

    constructor(protected http: HttpClient) {
        super(http);
    }

    protected getUrl(): string {
        return this.url;
    }

    protected transform(res: IpDataResponseInterface): LocationModel {
        const location = new LocationModel();
        location.postalCode = res.postal;
        location.countryCode = res.country_code;
        location.latitude = res.latitude;
        location.longitude = res.longitude;
        location.timezone = res.time_zone.name;
        location.city = res.city;
        location.regionCode = res.region_code;

        return location;
    }
}
