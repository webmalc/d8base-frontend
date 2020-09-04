import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '@app/core/services/helper.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Message} from '@app/message/models/message';
import {SentMessage} from '@app/message/models/sent-message';
import {MessageListUpdaterService} from '@app/message/services/message-list-updater.service';
import {MessagesListApiService} from '@app/message/services/messages-list-api.service';
import {MessagesSentApiService} from '@app/message/services/messages-sent-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {IonContent, IonInfiniteScroll} from '@ionic/angular';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-direct',
    templateUrl: './direct.component.html',
    styleUrls: ['./direct.component.scss'],
})
export class DirectComponent extends Reinitable implements OnInit, OnDestroy {

    public messages$: BehaviorSubject<Message[]> = new BehaviorSubject([]);
    public list: Message[] = [];
    public currentUserId: number;
    public interlocutorId: number;
    public message: string;
    @ViewChild(IonInfiniteScroll) public infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonContent, {read: IonContent, static: false}) public content: IonContent;
    private messagesSubscription: Subscription;
    private currentMessagesApiPage: number = 1;

    constructor(
        private messagesListApi: MessagesListApiService,
        private route: ActivatedRoute,
        private userManager: UserManagerService,
        private messagesSentApi: MessagesSentApiService,
        private messageListUpdater: MessageListUpdaterService
    ) {
        super();
    }

    public loadData(): void {
        console.log('asdf');
        this.infiniteScroll.complete();
    }

    public ionViewDidLeave(): void {
        this.ngOnDestroy();
    }

    public ngOnDestroy(): void {
        console.log('destroyed');
        this.messagesSubscription.unsubscribe();
        this.messageListUpdater.destroy();
    }

    public ngOnInit(): void {
        // this.infiniteScroll.disabled = true;
        this.interlocutorId = parseInt(this.route.snapshot.paramMap.get('interlocutor-id'), 10);
        this.userManager.getCurrentUser().subscribe(
            user => this.currentUserId = user.id
        );
        this.subscribeToMessagesUpdate();
    }

    public send(): void {
        if (!this.message) {
            return;
        }
        this.messagesSentApi.create(this.generateSentMessage()).subscribe(
            res => {
                this.updateMessageList();
                this.clearMessageArea();
            }
        );
    }

    public timeFromDatetime(datetime: string): string {
        return HelperService.fromDatetime(datetime).time;
    }

    public getCheckmarkColor(message: Message): string {
        return message.is_read ? 'success' : 'dark';
    }

    private subscribeToMessagesUpdate(): void {
        this.messagesSubscription = this.messageListUpdater.receiveUpdates(this.interlocutorId).subscribe(
            (list: Message[]) => this.isNeedToUpdate(list.reverse()).pipe(tap(_ => console.log('tick')), filter(isNeed => isNeed))
                .subscribe(_ => this.updateMessageList(list))
        );
    }

    private isNeedToUpdate(newList: Message[]): Observable<boolean> {
        return this.messages$.pipe(
            first(),
            map(
                (currentList: Message[]) => currentList.slice(0, 50)
            ),
            map(
                (currentList: Message[]) => {
                    if (newList.length !== currentList.length) {
                        return true;
                    }
                    for (let i = 0; i < newList.length; i += 1) {
                        if ((newList[i].body !== currentList[i].body) || (newList[i].is_read !== currentList[i].is_read)) {
                            return true;
                        }
                    }

                    return false;
                }
            )
        );
    }

    private generateSentMessage(): SentMessage {
        const message = new SentMessage();
        message.recipient = this.interlocutorId;
        message.body = this.message;

        return message;
    }

    private updateMessageList(list?: Message[]): void {
        list ? this.setList(list) : this.messagesListApi.getByInterlocutor(this.interlocutorId, 50).subscribe(
            listApiResponse => this.setList(listApiResponse.results.reverse())
        );
    }

    private setList(list: Message[]): void {
        this.messages$.next(list);
        console.log('scrolling');
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        setTimeout(() => this.content.scrollToBottom(), 200);
    }

    private clearMessageArea(): void {
        this.message = null;
    }
}
