import {Injectable} from '@angular/core';
import {Message} from '@app/message/models/message';
import {MessagesListApiService} from '@app/message/services/messages-list-api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import Timer = NodeJS.Timer;

@Injectable()
export class MessageListUpdaterService {

    private timer: Timer;
    private readonly updateInterval: number = environment.message.direct_update_interval_ms;
    private currentMessagesPage: number = 1;

    constructor(private messagesListApi: MessagesListApiService) {
    }

    public receiveUpdates(interlocutorId: number): Observable<Message[]> {
        this.destroy();

        return new Observable<Message[]>(
            subscriber => {
                this.timer = setInterval(() => this.messagesListApi.getByInterlocutor(
                    interlocutorId, 50
                ).subscribe(
                    data => subscriber.next(data.results),
                    err => console.log(err)
                ), this.updateInterval);
            }
        );
    }

    public getMessageList(interlocutorId: number, page: number): Observable<Message[]> {
        return this.messagesListApi.getByInterlocutor(interlocutorId, 50, page).pipe(
            map(result => result.results)
        );
    }

    public destroy(): void {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
