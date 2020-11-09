import {Injectable} from '@angular/core';
import {IpLocation} from '@app/core/models/ip-location';
import {UserLocation} from '@app/core/models/user-location';
import {Geolocation, GeolocationOptions, Geoposition} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {Observable, of, onErrorResumeNext} from 'rxjs';
import {catchError, first} from 'rxjs/operators';
import {IpServicesHolderService} from './ip-services-holder.service';

/**
 *  Returns user location data by ip
 */
@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(
        private readonly ipServicesHolder: IpServicesHolderService,
        private readonly geolocation: Geolocation,
        private readonly locationAccuracy: LocationAccuracy
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
                        ).catch(e => resolve(null));
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

    public getMergedLocationData(): Promise<UserLocation | null> {
        return new Promise<UserLocation | null>(resolve => {
            this.getCurrentPosition().then(
                (geolocation: Geoposition) => {
                    this.getIpLocationData().subscribe(
                        (ipLocation: IpLocation) => {
                            const location = new UserLocation();
                            if (null !== geolocation) {
                                location.coordinates = {
                                    type: 'Point',
                                    coordinates: [
                                        geolocation.coords.longitude,
                                        geolocation.coords.latitude
                                    ]
                                };
                            } else if (null !== ipLocation) {
                                location.coordinates = {
                                    type: 'Point',
                                    coordinates: [
                                        ipLocation.longitude,
                                        ipLocation.latitude
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

    public getIpLocationData(): Observable<IpLocation | null> {
        return onErrorResumeNext(...this.ipServicesHolder.getList().map(service => service.getData()))
            .pipe(
                first(),
                catchError(e => of(null))
            );
    }
}
