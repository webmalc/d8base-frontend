import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {OrderModel} from '@app/core/models/order-model';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class SentOrdersApiService extends AbstractApiService<OrderModel> {

    constructor(client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return environment.backend.sent_orders;
    }
}
