import {Injectable} from '@angular/core';
import {IpServicesHolderService} from './ip-services-holder.service';
import {IpDataInterface} from '../../interfaces/location/ip-data.interface';
import {GeolocationService} from '@app/core/proxies/geolocation.service';
import {Geoposition} from '@ionic-native/geolocation';

/**
 *  Returns user location data by ip
 */
@Injectable()
export class LocationService {

    constructor(private ipServicesHolder: IpServicesHolderService, private geolocation: GeolocationService) {
    }

    public getLocationData(): Promise<IpDataInterface | null | Geoposition> {
        return new Promise<IpDataInterface | null | Geoposition>((resolve) => {
            this.getIpData()
                .then((ipData: IpDataInterface | null) => {
                    this.geolocation.getCurrentPosition().then(
                        (coords: Geoposition) => {
                            if (coords.coords.latitude && coords.coords.longitude) {
                                ipData.latitude = coords.coords.latitude;
                                ipData.longitude = coords.coords.longitude;
                            }
                            resolve(ipData);
                        }
                    ).catch(
                        e => resolve(ipData)
                    );
                }).catch(
                    e => {
                        this.geolocation.getCurrentPosition().then(
                            (coords: Geoposition) => resolve(coords)
                        ).catch(
                            err => resolve(null)
                        );
                    }
            );
        });
    }

    private async getIpData(): Promise<IpDataInterface | null> {
        let ipData: IpDataInterface = null;
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
