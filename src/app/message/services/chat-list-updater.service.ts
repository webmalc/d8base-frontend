import {Injectable} from '@angular/core';
import {AbstractMessage} from '@app/message/models/abstract-message';
import {ChatsCompilerService} from '@app/message/services/chats-compiler.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import Timer = NodeJS.Timer;

@Injectable()
export class ChatListUpdaterService {

    private timer: Timer;
    private readonly updateInterval: number = environment.message.chat_list_update_interval_ms;

    constructor(private chatsCompilerService: ChatsCompilerService) {
    }

    public receiveUpdates(): Observable<AbstractMessage[]> {
        this.destroy();

        return new Observable<AbstractMessage[]>(
            subscriber => {
                this.timer = setInterval(() => this.chatsCompilerService.generateChatList().then(
                    (chatList: AbstractMessage[]) => subscriber.next(chatList)
                ), this.updateInterval);
            }
        );
    }

    public destroy(): void {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
