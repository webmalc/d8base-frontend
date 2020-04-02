import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IpDataResponseInterface} from '@app/auth/interfaces/location/ip-data-response.interface';
import {IpServiceInterface} from '@app/auth/interfaces/location/ip-service.interface';
import {IpLocation} from '@app/core/models/ip-location';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractIpService implements IpServiceInterface {

    protected constructor(protected http: HttpClient) {
    }

    public getData(): Promise<IpLocation> {
        return new Promise((resolve, reject) => {
            this.http.get(this.getUrl())
                .pipe(
                    catchError(async () => {
                        reject();
                    })
                ).subscribe(
                (res: IpDataResponseInterface) => {
                    try {
                        const tra = this.transform(res);
                        resolve(tra);
                    } catch (e) {
                        reject();
                    }
                }
            );
        });
    }

    protected abstract getUrl(): string;
    protected abstract transform(res: object): IpLocation;
}
