import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AbstractMessageService} from '@app/message/abstract/abstract-message.service';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OutboxMessageService extends AbstractMessageService {

    constructor(private apiService: ApiClientService) {
        super(apiService);
    }
    protected getUrl(): string {
        return environment.backend.communication_messages_sent;
    }


}
