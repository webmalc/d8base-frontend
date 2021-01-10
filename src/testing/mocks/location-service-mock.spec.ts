import { IpLocation } from '@app/core/models/ip-location';
import { UserLocation } from '@app/core/models/user-location';
import { Geoposition } from '@ionic-native/geolocation/ngx';

export class LocationServiceMock {
  public getCurrentPosition(): Promise<Geoposition | null> {
    return Promise.resolve(null);
  }

  public getMergedLocationData(): Promise<UserLocation | null> {
    return Promise.resolve(null);
  }

  public async getIpLocationData(): Promise<IpLocation | null> {
    return Promise.resolve(null);
  }
}
