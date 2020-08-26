import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '@app/core/services/helper.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Message} from '@app/message/models/message';
import {MessagesListApiService} from '@app/message/services/messages-list-api.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-direct',
    templateUrl: './direct.component.html',
    styleUrls: ['./direct.component.scss'],
})
export class DirectComponent implements OnInit {

    public messages$: BehaviorSubject<Message[]> = new BehaviorSubject([]);
    public list: Message[] = [];
    public currentUserId: number;

    constructor(
        private messagesListApi: MessagesListApiService,
        private route: ActivatedRoute,
        private userManager: UserManagerService
    ) {
    }

    public ngOnInit(): void {
        this.messagesListApi.getByInterlocutor(parseInt(this.route.snapshot.paramMap.get('interlocutor-id'), 10), 50).subscribe(
            listApiResponse => this.messages$.next(listApiResponse.results)
        );
        this.userManager.getCurrentUser().subscribe(
            user => this.currentUserId = user.id
        );
    }

    public timeFromDatetime(datetime: string): string {
        return HelperService.fromDatetime(datetime).time;
    }

    public getCheckmarkColor(message: Message): string {
        return message.is_read ? 'success' : 'dark';
    }
}
