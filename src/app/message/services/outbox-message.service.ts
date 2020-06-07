import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AbstractMessageService} from '@app/message/abstract/abstract-message.service';
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
