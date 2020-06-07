import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AbstractMessageService} from '@app/message/abstract/abstract-message.service';
import {environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class InboxMessageService extends AbstractMessageService {
    constructor(protected apiClient: ApiClientService) {
        super(apiClient);
    }

    public markMessageAsRead(messageId: number): void {

    }
    // public makeMessageUnread(messageId: number): Observable<MessageInterface> {
    //     return this.client.patch(`${this.getUrl()}${messageId}/`, {is_read: false});
    // }

    protected getUrl(): string {
        return environment.backend.communication_messages_received;
    }

}
