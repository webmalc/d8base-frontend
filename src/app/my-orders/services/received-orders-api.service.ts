import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ReceivedOrder} from '@app/core/models/received-order';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';

@Injectable({
    providedIn: 'root',
})
export class ReceivedOrdersApiService extends AbstractApiService<ReceivedOrder> {
    constructor(client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return environment.backend.received_orders;
    }

    // @ts-ignore
    protected transform(data: ReceivedOrder | ReceivedOrder[]): ReceivedOrder | ReceivedOrder[] {
        return plainToClass(ReceivedOrder, data);
    }
}
