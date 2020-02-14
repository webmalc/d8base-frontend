import {Injectable} from '@angular/core';
import {IpServiceInterface} from '../../interfaces/location/ip-service.interface';
import {HttpClient} from '@angular/common/http';
import {IpDataInterface} from '../../interfaces/location/ip-data.interface';
import {IpDataResponseInterface} from '../../interfaces/location/ip-data-response.interface';
import {catchError} from 'rxjs/operators';

@Injectable()
export class IpDataService implements IpServiceInterface {

    private readonly url = 'https://api.ipdata.co/?api-key=38d09cb1dc1cedbb96cc308e8723539bba0488876f5ccf85d4a8e6d7';

    constructor(private http: HttpClient) {
    }

    public getData(): Promise<IpDataInterface> {
        return new Promise((resolve, reject) => {
            this.http.get(this.url)
                .pipe(
                    catchError(async () => {
                        reject();
                    })
                ).subscribe(
                (res: IpDataResponseInterface) => {
                    try {
                        resolve({
                            postal_code: res.postal,
                            country_code: res.country_code,
                            latitude: res.latitude,
                            longitude: res.longitude,
                            timezone: res.time_zone.name,
                            city: res.city,
                            region_code: res.region_code
                        });
                    } catch (e) {
                        reject();
                    }
                }
            );
        });
    }
}
