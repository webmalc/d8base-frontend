import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {SentOrder} from '@app/core/models/sent-order';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';

@Injectable({
    providedIn: 'root',
})
export class SentOrdersApiService extends AbstractApiService<SentOrder> {

    constructor(client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return environment.backend.sent_orders;
    }

    // @ts-ignore
    protected transform(data: SentOrder | SentOrder[]): SentOrder | SentOrder[] {
        return plainToClass(SentOrder, data);
    }
}
