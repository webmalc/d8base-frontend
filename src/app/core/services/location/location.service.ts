import {Injectable} from '@angular/core';
import {IpServicesHolderService} from './ip-services-holder.service';
import {LocationInterface} from '@app/auth/interfaces/location/location.interface';
import {Geolocation, GeolocationOptions, Geoposition} from '@ionic-native/geolocation/ngx';
import {Observable} from 'rxjs';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';

/**
 *  Returns user location data by ip
 */
@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(
        private ipServicesHolder: IpServicesHolderService,
        private geolocation: Geolocation,
        private locationAccuracy: LocationAccuracy
    ) {
    }

    public getCurrentPosition(): Promise<Geoposition> {
        return new Promise<Geoposition>(resolve => {
            this.locationAccuracy.canRequest().then(
                (canRequest: boolean) => {
                    if (canRequest) {
                        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                            () => {
                                this.geolocation.getCurrentPosition().then(
                                    (geoposition: Geoposition) => resolve(geoposition)
                                );
                            }
                        );
                    } else {
                        this.geolocation.getCurrentPosition().then(
                            (geoposition: Geoposition) => resolve(geoposition)
                        );
                    }
                }
            );
        });
    }

    public watchPosition(options?: GeolocationOptions): Observable<Geoposition> {
        return this.geolocation.watchPosition(options);
    }

    public getMergedLocationData(): Promise<LocationInterface | null> {
        return new Promise<LocationInterface | null>(resolve => {
            this.getCurrentPosition().then(
                (geolocation: Geoposition) => {
                    console.log(geolocation);
                    this.getIpLocationData().then(
                        (locationData: LocationInterface) => {
                            console.log(locationData);
                            locationData.latitude = geolocation.coords.latitude;
                            locationData.longitude = geolocation.coords.longitude;
                            resolve(locationData);
                        }
                    );
                }
            ).catch(
                e => resolve(null)
            );
        });
    }

    public async getIpLocationData(): Promise<LocationInterface | null> {
        let ipData: LocationInterface = null;
        for (const ipService of this.ipServicesHolder.list) {
            try {
                ipData = await ipService.getData();
                break;
            } catch (e) {
            }
        }

        return ipData;
    }
}
