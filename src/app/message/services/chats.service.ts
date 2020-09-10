import {Injectable} from '@angular/core';
import {AbstractMessage} from '@app/message/models/abstract-message';
import {ChatListUpdaterService} from '@app/message/services/chat-list-updater.service';
import {ChatsCompilerService} from '@app/message/services/chats-compiler.service';
import {ChatsSearchService} from '@app/message/services/chats-search.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';

@Injectable()
export class ChatsService {

    public chatList$: BehaviorSubject<AbstractMessage[]> = new BehaviorSubject<AbstractMessage[]>([]);
    private defaultChatList: AbstractMessage[] = [];
    private chatsSubscription: Subscription;

    constructor(
        private chatsCompilerService: ChatsCompilerService,
        private chatListUpdater: ChatListUpdaterService,
        private search: ChatsSearchService
    ) {
    }

    public doSearch(value: string): void {
        value === '' ? this.chatList$.next(this.defaultChatList) : this.chatList$.next(this.search.search(this.defaultChatList, value));
    }

    public destroy(): void {
        this.chatsSubscription.unsubscribe();
        this.chatListUpdater.destroy();
    }

    public initChatList(): Observable<any> {
        return this.chatListUpdater.getChatList().pipe(
            map(list => this.setLists(list.reverse()))
        );
    }

    public subscribeToChatListUpdates(): void {
        this.chatsSubscription = this.chatListUpdater.receiveUpdates().subscribe(
            (newList: AbstractMessage[]) => this.isNeedToUpdate(newList.reverse()).pipe(filter(isNeed => true === isNeed))
                .subscribe(_ => this.setLists(newList.reverse()))
        );
    }

    private setLists(data: AbstractMessage[]): void {
        this.chatList$.next(data);
        this.defaultChatList = data;
    }

    private isNeedToUpdate(chatList: AbstractMessage[]): Observable<boolean> {
        return this.chatList$.pipe(
            first(),
            map(
                (defaultList: AbstractMessage[]) => {
                    if (defaultList.length !== chatList.length) {
                        return true;
                    }
                    for (let i = 0; i < chatList.length; i += 1) {
                        if (chatList[i].interlocutor_id !== defaultList[i].interlocutor_id ||
                            chatList[i].is_read !== defaultList[i].is_read ||
                            chatList[i].body !== defaultList[i].body ||
                            chatList[i].unread_count !== defaultList[i].unread_count
                        ) {
                            return true;
                        }
                    }

                    return false;
                }
            )
        );
    }
}
