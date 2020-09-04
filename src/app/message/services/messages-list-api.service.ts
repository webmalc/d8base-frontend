import {Injectable} from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Message} from '@app/message/models/message';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class MessagesListApiService extends AbstractReadonlyApiService<Message> {

    private readonly url = environment.backend.messages_list;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getByInterlocutor(interlocutorId: number, pageSize?: number, page?: number): Observable<ApiListResponseInterface<Message>> {
        return super.get({interlocutor: interlocutorId.toString(10), page_size: pageSize?.toString(10), page: page?.toString(10)});
    }

    public getUnreadCount(interlocutorId: number): Observable<number> {
        return super.get({is_read: 'false', sender: interlocutorId.toString(10)}).pipe(
            map(list => list.count)
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Message | Message[]): Message | Message[] {
        return plainToClass(Message, data);
    }
}
