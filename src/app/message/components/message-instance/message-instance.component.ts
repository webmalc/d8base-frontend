import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MessageBoxType} from '@app/message/enums/message-box-type';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {BOX_TYPE} from '@app/message/providers/box-type.provider';

@Component({
    selector: 'app-message-instance',
    templateUrl: './message-instance.component.html',
    styleUrls: ['./message-instance.component.scss'],
})
export class MessageInstanceComponent {
    @Input() public message: MessageInterface;
    @Output() public delete: EventEmitter<number> = new EventEmitter<number>();
    @Output() public read: EventEmitter<number> = new EventEmitter<number>();
    @Output() public unread: EventEmitter<number> = new EventEmitter<number>();
    @Output() public reply: EventEmitter<number> = new EventEmitter<number>();

    public isOpened: boolean = false;
    public availableBoxTypes = MessageBoxType;

    constructor(@Inject(BOX_TYPE) public boxType: string ) {
    }

    public deleteMessage(): void {
        this.delete.emit(this.message.id);
    }

    public readMessage(): void {
        !this.isOpened ? this.openMessage() : this.closeMessage();
        this.read.emit(this.message.id);
    }

    public makeUnread(): void {
        this.closeMessage();
        this.unread.emit(this.message.id);
    }

    public doReply(): void {
        this.reply.emit(this.message.id);
    }

    public isRead(): boolean {
        return this.message.isRead;
    }

    private openMessage(): void {
        this.isOpened = true;
    }

    private closeMessage(): void {
        this.isOpened = false;
    }


}
