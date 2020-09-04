import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractMessage} from '@app/message/models/abstract-message';
import {ChatListUpdaterService} from '@app/message/services/chat-list-updater.service';
import {ChatsCompilerService} from '@app/message/services/chats-compiler.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent extends Reinitable implements OnInit, OnDestroy {

    public chatList$: BehaviorSubject<AbstractMessage[]> = new BehaviorSubject<AbstractMessage[]>([]);
    private chatsSubscription: Subscription;

    constructor(
        private chatsCompilerService: ChatsCompilerService,
        private router: Router,
        private chatListUpdater: ChatListUpdaterService
    ) {
        super();
    }

    public ionViewDidLeave(): void {
        this.ngOnDestroy();
    }

    public ngOnDestroy(): void {
        console.log('destroyed');
        this.chatsSubscription.unsubscribe();
        this.chatListUpdater.destroy();
    }

    public ngOnInit(): void {
        this.chatsCompilerService.generateChatList().then(
            list => this.chatList$.next(list.reverse())
        );
        this.subscribeToChatListUpdates();
    }

    public onChatClick(interlocutorId: number): void {
        this.router.navigateByUrl('/message/chat/' + interlocutorId);
    }

    private subscribeToChatListUpdates(): void {
        this.chatsSubscription = this.chatListUpdater.receiveUpdates().subscribe(
            (newList: AbstractMessage[]) => this.isNeedToUpdate(newList).pipe(filter(isNeed => isNeed), tap(_ => console.log('tick')))
                .subscribe(_ => this.chatList$.next(newList.reverse()))
        );
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
