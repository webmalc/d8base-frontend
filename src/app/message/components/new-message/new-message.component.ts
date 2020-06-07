import {Component, Input} from '@angular/core';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {OutboxMessageService} from '@app/message/services/outbox-message.service';

@Component({
    selector: 'app-new-message',
    templateUrl: './new-message.component.html',
    styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent {
    @Input() public parentMessage: MessageInterface;
    public message: MessageInterface = {
        subject: '',
        body: '',
        recipient: null,
        isRead: false,
        parent: null
    };
    constructor(private messageService: OutboxMessageService) {
    }

    public sendMessage(): void {
        this.messageService.sendMessage(this.message).subscribe(
            message => this.message = message,
            error => console.log(error.error)
        );
    }
}
