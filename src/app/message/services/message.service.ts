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
        const message = {
            id: 0,
            body: 'message0 body body message',
            isRead: false,
            parent: null,
            subject: 'subject0',
            sender: 0
        };
        const message1 = {
            id: 1,
            body: 'message1 bodsf body1 mesasge',
            isRead: false,
            parent: null,
            subject: 'subject1',
            sender: 1
        };

        return of([message, message1]);
    }

    public getMessage(messageId: number): Observable<MessageInterface> {
        return this.client.get(`${this.url}${messageId}/`);
    }

    public removeMessage(messageId: number): Observable<void> {
        return this.client.delete(`${this.url}${messageId}/`);
    }

}
