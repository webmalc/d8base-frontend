import { Injectable } from '@angular/core';
import { IpLocation } from '@app/core/models/ip-location';
import { UserLocation } from '@app/core/models/user-location';
import { Coords } from '@app/shared/interfaces/coords';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { from, Observable, of, onErrorResumeNext } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';
import { IpServicesHolderService } from './ip-services-holder.service';

/**
 *  Returns user location data by ip
 */
@Injectable({
    providedIn: 'root',
})
export class LocationService { // cringe

    constructor(
        private readonly ipServicesHolder: IpServicesHolderService,
        private readonly geolocation: Geolocation,
        private readonly locationAccuracy: LocationAccuracy,
    ) {
    }

    public getCurrentPosition(): Promise<Coords | null> {
        return new Promise<Coords>(resolve => this.locationAccuracy.canRequest().then(
            (canRequest: boolean) => canRequest ?
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    () => this.geolocation.getCurrentPosition().then(
                        (geo: Geoposition) => resolve({ latitude: geo.coords.latitude, longitude: geo.coords.longitude}),
                    ),
                ).catch(_ => resolve(null)) :
                this.geolocation.getCurrentPosition().then(
                    (geo: Geoposition) => resolve({ latitude: geo.coords.latitude, longitude: geo.coords.longitude}),
                ).catch(_ => resolve(null)),
        ).catch(_ => resolve(null)));
    }

    public getCurrentMergedPosition(): Observable<Coords | null> {
        return from(this.getCurrentPosition()).pipe(
            switchMap(data => null === data ? this.getIpLocationData() : of(data)),
        );
    }

    public getMergedLocationData(): Promise<UserLocation | null> {
        return new Promise<UserLocation | null>(resolve => {
            this.getCurrentPosition().then(
                (coords: Coords) => {
                    this.getIpLocationData().subscribe(
                        (ipLocation: IpLocation) => {
                            const location = new UserLocation();
                            if (null !== coords) {
                                location.coordinates = {
                                    type: 'Point',
                                    coordinates: [
                                        coords.longitude,
                                        coords.latitude,
                                    ],
                                };
                            } else if (null !== ipLocation) {
                                location.coordinates = {
                                    type: 'Point',
                                    coordinates: [
                                        ipLocation.longitude,
                                        ipLocation.latitude,
                                    ],
                                };
                            } else {
                                return resolve(null);
                            }
                            resolve(location);
                        },
                    );
                },
            ).catch(_ => resolve(null));
        });
    }

    public getIpLocationData(): Observable<IpLocation | null> {
        return onErrorResumeNext(...this.ipServicesHolder.getList().map(service => service.getData()))
            .pipe(
                first(),
                catchError(e => of(null)),
            );
    }
}
