import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {NotificationWorkerService} from '@app/core/services/notification-worker.service';
import {Message} from '@app/message/models/message';
import {MessagesListApiService} from '@app/message/services/messages-list-api.service';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import Timer = NodeJS.Timer;

@Injectable()
export class MessageListUpdaterService {

    private timer: Timer;
    private readonly updateInterval: number = environment.message.direct_update_interval_ms;
    private readonly messagesPerPage: number = environment.message.messages_per_page;

    constructor(private readonly messagesListApi: MessagesListApiService, private readonly notificationWorker: NotificationWorkerService) {
    }

    public receiveUpdates(interlocutorId: number): Observable<ApiListResponseInterface<Message>> {
        this.destroy();

        return NotificationWorkerService.isFirebaseSupported() ? this.notificationWorker.messageReceived$.pipe(
            switchMap(() => this.getMessageList(interlocutorId))
        ) : new Observable<ApiListResponseInterface<Message>>(
            subscriber => {
                this.timer = setInterval(() => this.messagesListApi.getByInterlocutor(
                    interlocutorId, this.messagesPerPage
                ).subscribe(
                    data => subscriber.next(data),
                    err => console.error(err)
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
