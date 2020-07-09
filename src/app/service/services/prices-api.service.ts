import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Price} from '@app/service/models/price';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable()
export class PricesApiService extends AbstractApiService<Price> {

    private readonly url = environment.backend.service_prices;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Price | Price[]): Price | Price[] {
        return plainToClass(Price, data);
    }
}
