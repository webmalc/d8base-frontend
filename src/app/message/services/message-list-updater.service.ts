import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Message} from '@app/message/models/message';
import {MessagesListApiService} from '@app/message/services/messages-list-api.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import Timer = NodeJS.Timer;

@Injectable()
export class MessageListUpdaterService {

    private timer: Timer;
    private readonly updateInterval: number = environment.message.direct_update_interval_ms;
    private readonly messagesPerPage: number = environment.message.messages_per_page;

    constructor(private messagesListApi: MessagesListApiService) {
    }

    public receiveUpdates(interlocutorId: number): Observable<ApiListResponseInterface<Message>> {
        this.destroy();

        return new Observable<ApiListResponseInterface<Message>>(
            subscriber => {
                this.timer = setInterval(() => this.messagesListApi.getByInterlocutor(
                    interlocutorId, this.messagesPerPage
                ).subscribe(
                    data => subscriber.next(data),
                    err => console.log(err)
                ), this.updateInterval);
            }
        );
    }

    public getMessageList(interlocutorId: number, page?: number): Observable<ApiListResponseInterface<Message>> {
        return this.messagesListApi.getByInterlocutor(interlocutorId, this.messagesPerPage, page);
    }

    public destroy(): void {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
