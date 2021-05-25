import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IpApiResponseInterface } from '@app/auth/interfaces/location/ip-api-response.interface';
import { IpLocation } from '@app/core/models/ip-location';
import { AbstractIpService } from '@app/core/services/location/abstract-ip.service';

@Injectable()
export class IpApiService extends AbstractIpService {
  private readonly url = 'https://ipapi.co/json/';

  constructor(protected http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return this.url;
  }

  protected transform(res: IpApiResponseInterface): IpLocation {
    if (res.error) {
      throw Error;
    }
    const location = new IpLocation();
    location.postalCode = res.postal;
    location.countryCode = res.country_code;
    location.latitude = parseFloat(res.latitude);
    location.longitude = parseFloat(res.longitude);
    location.timezone = res.timezone;
    location.city = res.city;

    return location;
  }
}
