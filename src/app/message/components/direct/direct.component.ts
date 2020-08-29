import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '@app/core/services/helper.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Message} from '@app/message/models/message';
import {SentMessage} from '@app/message/models/sent-message';
import {MessagesListApiService} from '@app/message/services/messages-list-api.service';
import {MessagesSentApiService} from '@app/message/services/messages-sent-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-direct',
    templateUrl: './direct.component.html',
    styleUrls: ['./direct.component.scss'],
})
export class DirectComponent extends Reinitable implements OnInit {

    public messages$: BehaviorSubject<Message[]> = new BehaviorSubject([]);
    public list: Message[] = [];
    public currentUserId: number;
    public interlocutorId: number;
    public message: string;


    constructor(
        private messagesListApi: MessagesListApiService,
        private route: ActivatedRoute,
        private userManager: UserManagerService,
        private messagesSentApi: MessagesSentApiService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.interlocutorId = parseInt(this.route.snapshot.paramMap.get('interlocutor-id'), 10);
        this.updateMessageList();
        this.userManager.getCurrentUser().subscribe(
            user => this.currentUserId = user.id
        );
    }

    public send(): void {
        this.messagesSentApi.create(this.generateSentMessage()).subscribe(
            res => this.updateMessageList()
        );
    }

    public timeFromDatetime(datetime: string): string {
        return HelperService.fromDatetime(datetime).time;
    }

    public getCheckmarkColor(message: Message): string {
        return message.is_read ? 'success' : 'dark';
    }

    private generateSentMessage(): SentMessage {
        const message = new SentMessage();
        message.recipient = this.interlocutorId;
        message.body = this.message;

        return message;
    }

    private updateMessageList(): void {
        this.messagesListApi.getByInterlocutor(this.interlocutorId, 50).subscribe(
            listApiResponse => this.messages$.next(listApiResponse.results.reverse())
        );
    }
}
