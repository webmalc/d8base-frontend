import {Injectable} from '@angular/core';
import {Currency} from '@app/core/models/currency';
import {ApiClientService} from '@app/core/services/api-client.service';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CurrencyListApiService {

    private readonly url = environment.backend.rates;

    constructor(private readonly api: ApiClientService) {
    }

    public getList(): Observable<Currency[]> {
        return this.api.get<Currency[]>(this.url).pipe(
            map(raw => plainToClass(Currency, raw))
        );
    }
}
