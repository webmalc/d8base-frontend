import {Component, Inject, OnInit} from '@angular/core';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {BOX_TYPE, boxTypeProvider} from '@app/message/providers/box-type.provider';
import {messageServiceProvider} from '@app/message/providers/message-service.factory';
import {MessageService} from '@app/message/services/message.service';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss'],
    providers: [
        messageServiceProvider,
        boxTypeProvider
    ]
})
export class MessageBoxComponent implements OnInit {
    public messages: MessageInterface[] = [];


    constructor(
        private service: MessageService,
        @Inject(BOX_TYPE) public boxType: string
    ) {
    }

    public ngOnInit(): void {
        this.service.getMessages().subscribe(
            messages => {
                this.messages = messages;
            }
        );
    }

    public deleteMessage(messageId: number): void {
        this.service.removeMessage(messageId).subscribe(
            _ => this.messages = this.messages.filter(message => message.id !== messageId)
        );
    }

    public makeMessageUnread(messageId: number): void {
        this.changeMessageReadStatus(messageId, false);
    }

    public readMessage(messageId: number): void {
        this.changeMessageReadStatus(messageId, true);
    }

    public replyMessage(messageId: number): void {
        console.log('some reply');
    }

    private changeMessageReadStatus(messageId: number, status: boolean): void {
        this.messages.map(message => {
            if (message.id === messageId) {
                message.isRead = status;
            }
        });
    }
}
