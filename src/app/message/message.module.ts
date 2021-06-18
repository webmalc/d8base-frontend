import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsListPageComponent } from '@app/message/pages/chats-list-page/chats-list-page.component';
import { ContextMenuPopoverComponent } from '@app/message/pages/chat-page/context-menu-popover/context-menu-popover.component';
import { ChatPageComponent } from '@app/message/pages/chat-page/chat-page.component';
import { ChatListUpdaterService } from '@app/message/pages/chats-list-page/chat-list-updater.service';
import { ChatsCompilerService } from '@app/message/pages/chats-list-page/chats-compiler.service';
import { ChatsService } from '@app/message/pages/chats-list-page/chats.service';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MessagePageRoutingModule } from './message-routing.module';
import { ChatsSearchService } from './pages/chats-list-page/chats-search.service';

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
  providers: [ChatsCompilerService, ChatListUpdaterService, ChatsService, ChatsSearchService],
})
export class MessagePageModule {}
