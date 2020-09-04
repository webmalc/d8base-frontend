import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MessagePageRoutingModule} from './message-routing.module';

import {DirectComponent} from '@app/message/components/direct/direct.component';
import {MessagesComponent} from '@app/message/components/messages/messages.component';
import {ChatsCompilerService} from '@app/message/services/chats-compiler.service';
import {LatestMessagesApiService} from '@app/message/services/latest-messages-api.service';
import {MessageListUpdaterService} from '@app/message/services/message-list-updater.service';
import {MessagesListApiService} from '@app/message/services/messages-list-api.service';
import {MessagesSentApiService} from '@app/message/services/messages-sent-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {MessagePage} from './message.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MessagePageRoutingModule,
        SharedModule,
        TranslateModule
    ],
    declarations: [
        MessagePage,
        DirectComponent,
        MessagesComponent
    ],
    providers: [
        ChatsCompilerService,
        LatestMessagesApiService,
        MessagesListApiService,
        MessagesSentApiService,
        MessageListUpdaterService
    ]
})
export class MessagePageModule {
}
