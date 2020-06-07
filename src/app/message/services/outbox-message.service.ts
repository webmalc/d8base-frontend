import {Injectable} from '@angular/core';
import {AbstractMessageService} from '@app/message/services/abstract-message.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '../../../environments/environment';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OutboxMessageService extends AbstractMessageService {

    constructor(private apiService: ApiClientService) {
        super(apiService);
    }
    public sendMessage(message: MessageInterface): Observable<MessageInterface> {
        return this.apiService.post<MessageInterface>(`${this.getUrl()}`, message);
    }

    protected getUrl(): string {
        return environment.backend.communication_messages_sent;
    }


}
