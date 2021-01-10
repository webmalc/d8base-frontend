import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IpDataResponseInterface } from '@app/auth/interfaces/location/ip-data-response.interface';
import { IpLocation } from '@app/core/models/ip-location';
import { AbstractIpService } from '@app/core/services/location/abstract-ip.service';

@Injectable()
export class IpDataService extends AbstractIpService {

  private readonly url = 'https://api.ipdata.co/?api-key=650902cc01a9a3a7cff619b38c0c9ef70b8faf08522fb680d0bd0abd';

  constructor(protected http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return this.url;
  }

  protected transform(res: IpDataResponseInterface): IpLocation {
    const location = new IpLocation();
    location.postalCode = res.postal;
    location.countryCode = res.country_code;
    location.latitude = parseFloat(res.latitude);
    location.longitude = parseFloat(res.longitude);
    location.timezone = res.time_zone.name;
    location.city = res.city;
    location.regionCode = res.region_code;

    return location;
  }
}
