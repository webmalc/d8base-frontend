import {Injectable} from '@angular/core';
import {IpLocation} from '@app/core/models/ip-location';
import {LocationModel} from '@app/core/models/location.model';
import {Geolocation, GeolocationOptions, Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {Observable} from 'rxjs';
import {IpServicesHolderService} from './ip-services-holder.service';

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

    public getCurrentPosition(): Promise<Geoposition | null> {
        return new Promise<Geoposition>(resolve => {
            this.locationAccuracy.canRequest().then(
                (canRequest: boolean) => {
                    if (canRequest) {
                        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                            () => {
                                this.geolocation.getCurrentPosition().then(
                                    (geoposition: Geoposition) => {
                                        resolve(geoposition);
                                    }
                                );
                            }
                        ).catch( e => resolve(null));
                    } else {
                        this.geolocation.getCurrentPosition().then(
                            (geoposition: Geoposition) => resolve(geoposition)
                        ).catch(e => resolve(null));
                    }
                }
            ).catch(
                e => resolve(null)
            );
        });
    }

    public watchPosition(options?: GeolocationOptions): Observable<Geoposition> {
        return this.geolocation.watchPosition(options);
    }

    public getMergedLocationData(): Promise<LocationModel | null> {
        return new Promise<LocationModel | null>(resolve => {
            this.getCurrentPosition().then(
                (geolocation: Geoposition) => {
                    this.getIpLocationData().then(
                        (ipLocation: IpLocation) => {
                            const location = new LocationModel();
                            if (null !== geolocation) {
                                location.coordinates = {
                                    type: 'Point',
                                    coordinates: [
                                        geolocation.coords.latitude,
                                        geolocation.coords.longitude
                                    ]
                                };
                            } else if (null !== ipLocation) {
                                location.coordinates = {
                                    type: 'Point',
                                    coordinates: [
                                        ipLocation.latitude,
                                        ipLocation.longitude
                                    ]
                                };
                            } else {
                                return resolve(null);
                            }
                            resolve(location);
                        }
                    );
                }
            ).catch(
                e => resolve(null)
            );
        });
    }

    public async getIpLocationData(): Promise<IpLocation> {
        let ipData: any = null;
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
