import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {map} from 'rxjs/operators';


@Injectable()
export class MessageService {
    private count: number = 0;

    constructor(
        private client: ApiClientService,
        @Inject(String) private url: string
    ) {
    }

    public getMessages(): Observable<MessageInterface[]> {
        return this.client.get<ApiListResponseInterface<MessageInterface>>(`${this.url}`)
            .pipe(
                map((raw: ApiListResponseInterface<MessageInterface>) => raw.results)
            );
    }

    public getMessage(messageId: number): Observable<MessageInterface> {
        return this.client.get(`${this.url}${messageId}/`);
    }

    public removeMessage(messageId: number): Observable<void> {
        return this.client.delete(`${this.url}${messageId}/`);
    }

    public makeMessageUnread(messageId: number): Observable<MessageInterface> {
        return this.client.patch(`${this.url}${messageId}/`, {is_read: false});
    }

}
