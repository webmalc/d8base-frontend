import {Injectable} from '@angular/core';
import {AbstractMessageService} from '@app/message/services/abstract-message.service';
import {ApiClientService} from '@app/core/services/api-client.service';
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
