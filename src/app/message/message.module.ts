import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MessagePageRoutingModule} from './message-routing.module';

import {MessageBoxComponent} from '@app/message/components/message-box/message-box.component';
import {MessageInstanceListComponent} from '@app/message/components/message-instance/message-instance-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {MessagePage} from './message.page';
import {MessageReaderComponent} from '@app/message/components/message-reader/message-reader.component';
import {MessageInboxResolver} from '@app/message/resolvers/message-inbox.resolver';
import {MessageOutboxResolver} from '@app/message/resolvers/message-outbox.resolver';
import {NewMessageComponent} from '@app/message/components/new-message/new-message.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicModule,
        CommonModule,
        TranslateModule,
        MessagePageRoutingModule
    ],
    declarations: [
        MessagePage,
        MessageBoxComponent,
        MessageInstanceListComponent,
        MessageReaderComponent,
        NewMessageComponent
    ],
    providers: [MessageInboxResolver, MessageOutboxResolver]
})
export class MessagePageModule {
}
