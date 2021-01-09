import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatsComponent } from '@app/message/components/chats/chats.component';
import { ContextMenuPopoverComponent } from '@app/message/components/context-menu-popover/context-menu-popover.component';
import { DirectComponent } from '@app/message/components/direct/direct.component';
import { ChatListUpdaterService } from '@app/message/services/chat-list-updater.service';
import { ChatsCompilerService } from '@app/message/services/chats-compiler.service';
import { ChatsService } from '@app/message/services/chats.service';
import { DirectServiceService } from '@app/message/services/direct-service.service';
import { LatestMessagesApiService } from '@app/message/services/latest-messages-api.service';
import { MessageListUpdaterService } from '@app/message/services/message-list-updater.service';
import { MessagesListApiService } from '@app/message/services/messages-list-api.service';
import { MessagesSentApiService } from '@app/message/services/messages-sent-api.service';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MessagePageRoutingModule } from './message-routing.module';
import { MessagePage } from './message.page';
import { ChatsSearchService } from './services/chats-search.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagePageRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [
    MessagePage,
    DirectComponent,
    ChatsComponent,
    ContextMenuPopoverComponent,
  ],
  providers: [
    ChatsCompilerService,
    LatestMessagesApiService,
    MessagesListApiService,
    MessagesSentApiService,
    MessageListUpdaterService,
    ChatListUpdaterService,
    DirectServiceService,
    ChatsService,
    ChatsSearchService,
  ],
})
export class MessagePageModule {
}
