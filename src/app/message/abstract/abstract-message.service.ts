import {EventEmitter} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

export abstract class AbstractMessageService {

    public newMessageEmitter: EventEmitter<MessageInterface> = new EventEmitter<MessageInterface>();
    public updateMessageEmitter: EventEmitter<MessageInterface> = new EventEmitter<MessageInterface>();
    public deletedMessageEmitter: EventEmitter<number> = new EventEmitter<number>();

    protected constructor(protected client: ApiClientService) {
    }

    public getMessages(): Observable<MessageInterface[]> {
        return this.client.get<ApiListResponseInterface<MessageInterface>>(`${this.getUrl()}`)
            .pipe(
                map((raw: ApiListResponseInterface<MessageInterface>) => raw.results),
            );
    }

    public readMessage(messageId: number): Observable<MessageInterface> {
        return this.client.get<MessageInterface>(`${this.getUrl()}${messageId}/`)
            .pipe(
                tap(message => this.updateMessageEmitter.emit(message))
            );
    }

    public removeMessage(messageId: number): Observable<void> {
        return this.client.delete(`${this.getUrl()}${messageId}/`)
            .pipe(
                tap( _ => this.deletedMessageEmitter.emit(messageId))
            );
    }

    protected abstract getUrl(): string;
}
