import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MessagePageRoutingModule} from './message-routing.module';

import {DirectComponent} from '@app/message/components/direct/direct.component';
import {MessagesComponent} from '@app/message/components/messages/messages.component';
import {MessagePage} from './message.page';
import {SharedModule} from '@app/shared/shared.module';
import {ChatsCompilerService} from '@app/message/services/chats-compiler.service';
import {LatestMessagesApiService} from '@app/message/services/latest-messages-api.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MessagePageRoutingModule,
        SharedModule
    ],
    declarations: [
        MessagePage,
        DirectComponent,
        MessagesComponent
    ],
    providers: [
        ChatsCompilerService,
        LatestMessagesApiService
    ]
})
export class MessagePageModule {
}
