import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IpDataInterface} from '../../interfaces/location/ip-data.interface';
import {catchError} from 'rxjs/operators';
import {IpnfResponseInterface} from '../../interfaces/location/ipnf-response.interface';

@Injectable()
export class IpnfDataService {

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
                            ip: res.ip.ip,
                            postal_code: res.ip.post_code,
                            country_code: res.ip.country_code
                        });
                    } catch (e) {
                        reject();
                    }
                }
            );
        });
    }
}
