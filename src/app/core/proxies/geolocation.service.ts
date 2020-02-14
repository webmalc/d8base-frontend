import {Injectable} from '@angular/core';
import {Geolocation, GeolocationOptions, Geoposition} from '@ionic-native/geolocation/ngx';
import {Observable} from 'rxjs';

/**
 *  Ionic Geolocation service proxy
 */
@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    constructor(private geolocation: Geolocation) {
    }

    public getCurrentPosition(): Promise<Geoposition> {
        return this.geolocation.getCurrentPosition();
    }

    public watchPosition(options?: GeolocationOptions): Observable<Geoposition> {
        return this.geolocation.watchPosition(options);
    }
}
