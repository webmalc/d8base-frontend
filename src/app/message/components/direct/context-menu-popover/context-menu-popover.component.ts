import { Component } from '@angular/core';
import { ChatItem } from '@app/message/components/direct/chat-item.interface';
import { NavParams, PopoverController } from '@ionic/angular';
import { MessageAction } from '../message-action.interface';

@Component({
  selector: 'app-context-menu-popover',
  templateUrl: './context-menu-popover.component.html',
  styleUrls: ['./context-menu-popover.component.scss'],
})
export class ContextMenuPopoverComponent {
  public chatItem: ChatItem;

  constructor(private readonly navParams: NavParams, private readonly popController: PopoverController) {
    this.chatItem = this.navParams.get<ChatItem>('message');
  }

  public async edit(): Promise<void> {
    const action: MessageAction = {
      actionType: 'edit',
      messageId: this.chatItem.messageId,
      messageBody: this.chatItem.body,
    };
    await this.popController.dismiss(action);
  }

  public async delete(): Promise<void> {
    const action: MessageAction = {
      actionType: 'delete',
      messageId: this.chatItem.messageId,
    };
    await this.popController.dismiss(action);
  }
}
