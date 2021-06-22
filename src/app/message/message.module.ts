import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatPageComponent } from '@app/message/pages/chat-page/chat-page.component';
import { ContextMenuPopoverComponent } from '@app/message/pages/chat-page/context-menu-popover/context-menu-popover.component';
import { ChatsListPageComponent } from '@app/message/pages/chats-list-page/chats-list-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MessagePageRoutingModule } from './message-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MessagePageRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [ChatPageComponent, ChatsListPageComponent, ContextMenuPopoverComponent],
})
export class MessagePageModule {}
