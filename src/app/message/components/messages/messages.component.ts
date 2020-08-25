import {Component, OnInit} from '@angular/core';
import {AbstractMessage} from '@app/message/models/abstract-message';
import {ChatsCompilerService} from '@app/message/services/chats-compiler.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {

    // public messages: AbstractMessage[] = [
    //     {
    //         interlocutor_id: 7,
    //         interlocutor: 'Test user',
    //         interlocutor_avatar_thumbnail: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
    //         body: 'test body...',
    //         is_read: false,
    //         created: '15:00',
    //         unread_count: 7
    //     }
    // ];
    public messages$: BehaviorSubject<AbstractMessage[]> = new BehaviorSubject<AbstractMessage[]>([]);

    constructor(private chatsCompilerService: ChatsCompilerService) {
        this.chatsCompilerService.generateChatList().subscribe(
            list => this.messages$.next(list)
        );
    }

    public ngOnInit(): void {
    }

}
