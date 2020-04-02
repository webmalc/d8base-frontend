import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IpnfResponseInterface} from '@app/auth/interfaces/location/ipnf-response.interface';
import {IpLocation} from '@app/core/models/ip-location';
import {AbstractIpService} from '@app/core/services/location/abstract-ip.service';

@Injectable()
export class IpnfDataService extends AbstractIpService {

    private readonly url = 'https://ip.nf/me.json';

    constructor(protected http: HttpClient) {
        super(http);
    }

    protected getUrl(): string {
        return this.url;
    }

    protected transform(res: IpnfResponseInterface): IpLocation {
        const location = new IpLocation();
        location.postalCode = res.ip.post_code;
        location.city = res.ip.city;
        location.countryCode = res.ip.country_code;
        location.latitude = res.ip.latitude;
        location.longitude = res.ip.longitude;

        return location;
    }
}
