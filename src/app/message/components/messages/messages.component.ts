import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractMessage} from '@app/message/models/abstract-message';
import {ChatsCompilerService} from '@app/message/services/chats-compiler.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent extends Reinitable implements OnInit {

    public messages$: BehaviorSubject<AbstractMessage[]> = new BehaviorSubject<AbstractMessage[]>([]);

    constructor(private chatsCompilerService: ChatsCompilerService, private router: Router) {
        super();
    }

    public ngOnInit(): void {
        this.chatsCompilerService.generateChatList().subscribe(
            list => this.messages$.next(list)
        );
    }

    public onChatClick(interlocutorId: number): void {
        this.router.navigateByUrl('/message/chat/' + interlocutorId);
    }
}
