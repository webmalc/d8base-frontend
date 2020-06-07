import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractMessageService} from '@app/message/abstract/abstract-message.service';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {BOX_TYPE, boxTypeProvider} from '@app/message/providers/box-type.provider';
import {messageServiceProvider} from '@app/message/providers/message-service.factory';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss'],
    providers: [
        boxTypeProvider,
        messageServiceProvider
    ]
})
export class MessageBoxComponent implements OnInit, OnDestroy {
    public messages: MessageInterface[] = [];
    private messageSubscription: Subscription;
    private deleteSubscription: Subscription;
    private updateSubscription: Subscription;

    constructor(
        private service: AbstractMessageService,
        @Inject(BOX_TYPE) public boxType: string
    ) {
    }

    public ngOnInit(): void {
        this.messageSubscription = this.service.newMessageEmitter
            .subscribe(
                message => this.messages.push(message)
            );
        this.deleteSubscription = this.service.deletedMessageEmitter
            .subscribe(
                messageId => this.messages = this.messages.filter(message => message.id !== messageId)
            );
        this.updateSubscription = this.service.updateMessageEmitter
            .subscribe(
                updatedMessage => {
                    const messageToUpdate = this.messages.find(message => {
                        return message.id === updatedMessage.id;
                    });
                    const index = this.messages.indexOf(messageToUpdate);
                    this.messages[index] = updatedMessage;
                }
            );
        this.service.getMessages().subscribe(message => this.messages = message);
    }

    public ngOnDestroy(): void {
        this.messageSubscription.unsubscribe();
        this.deleteSubscription.unsubscribe();
        this.updateSubscription.unsubscribe();
    }


    public deleteMessage(messageId: number): void {
        this.service.removeMessage(messageId)
            .subscribe();
    }

    public makeMessageUnread(messageId: number): void {
        console.log('No way yet');
    }

    public readMessage(messageId: number): void {
        this.service.readMessage(messageId);
    }

    public replyMessage(messageId: number): void {
        console.log('Implement reply');
    }

}
