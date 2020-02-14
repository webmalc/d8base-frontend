import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IpDataInterface} from '../../interfaces/location/ip-data.interface';
import {catchError} from 'rxjs/operators';
import {IpnfResponseInterface} from '../../interfaces/location/ipnf-response.interface';
import {IpServiceInterface} from '@app/auth/interfaces/location/ip-service.interface';

@Injectable()
export class IpnfDataService implements IpServiceInterface {

    private readonly url = 'https://ip.nf/me.json';

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
                (res: IpnfResponseInterface) => {
                    try {
                        resolve({
                            postal_code: res.ip.post_code,
                            country_code: res.ip.country_code,
                            city: res.ip.city,
                            latitude: res.ip.latitude,
                            longitude: res.ip.longitude
                        });
                    } catch (e) {
                        reject();
                    }
                }
            );
        });
    }
}
