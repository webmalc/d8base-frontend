import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IpDataResponseInterface} from '@app/auth/interfaces/location/ip-data-response.interface';
import {IpServiceInterface} from '@app/auth/interfaces/location/ip-service.interface';
import {LocationModel} from '@app/core/models/location.model';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractIpService implements IpServiceInterface {

    protected constructor(protected http: HttpClient) {
    }

    public getData(): Promise<LocationModel> {
        return new Promise((resolve, reject) => {
            this.http.get(this.getUrl())
                .pipe(
                    catchError(async () => {
                        reject();
                    })
                ).subscribe(
                (res: IpDataResponseInterface) => {
                    try {
                        resolve(this.transform(res));
                    } catch (e) {
                        reject();
                    }
                }
            );
        });
    }

    protected abstract getUrl(): string;
    protected abstract transform(res: object): LocationModel;

}
