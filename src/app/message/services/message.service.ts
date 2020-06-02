import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {ApiClientService} from '@app/core/services/api-client.service';


@Injectable()
export class MessageService {
    private count: number = 0;

    constructor(
        private client: ApiClientService,
        @Inject(String) private url: string
    ) {
    }

    public getMessages(): Observable<MessageInterface[]> {

        return this.client.get<MessageInterface[]>(`${this.url}`);
    }

    public getMessage(messageId: number): Observable<MessageInterface> {
        return this.client.get(`${this.url}${messageId}/`);
    }

    public removeMessage(messageId: number): Observable<void> {
        return this.client.delete(`${this.url}${messageId}/`);
    }

}
