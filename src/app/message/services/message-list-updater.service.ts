import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Message} from '@app/message/models/message';
import {MessagesListApiService} from '@app/message/services/messages-list-api.service';
import {Observable} from 'rxjs';
import Timer = NodeJS.Timer;

@Injectable()
export class MessageListUpdaterService {

    private timer: Timer;

    constructor(private messagesListApi: MessagesListApiService, private route: ActivatedRoute) {
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
                ), 1000);
            }
        );
    }

    public destroy(): void {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
