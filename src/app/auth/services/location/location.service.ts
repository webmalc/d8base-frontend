import {Injectable} from '@angular/core';
import {IpServicesHolderService} from './ip-services-holder.service';
import {IpDataInterface} from '../../interfaces/location/ip-data.interface';

@Injectable()
export class LocationService {

    constructor(private ipServicesHolder: IpServicesHolderService) {
    }

    public getIpData(): Promise<IpDataInterface | null> {
        return new Promise<IpDataInterface | null>((resolve, reject) => {
            this.getData()
                .then((ipData: IpDataInterface | null) => {
                    if (ipData === null) {
                        reject(null);
                    }
                    resolve(ipData);
                });
        });
    }

    private async getData(): Promise<IpDataInterface | null> {
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
