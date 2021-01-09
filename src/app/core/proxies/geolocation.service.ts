import { Injectable } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';

/**
 *  Ionic Geolocation service proxy
 */
@Injectable({
  providedIn: 'root',
})
export class GeolocationService {

  constructor(private readonly geolocation: Geolocation) {
  }

  public getCurrentPosition(): Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }

  public watchPosition(options?: GeolocationOptions): Observable<Geoposition | PositionError> {
    return this.geolocation.watchPosition(options);
  }
}
