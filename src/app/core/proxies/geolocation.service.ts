import {Injectable} from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {

    constructor(private geolocation: Geolocation) {
    }

    public getCords(): Promise<Geoposition> {
        return this.geolocation.getCurrentPosition();
    }
}
