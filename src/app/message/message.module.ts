import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MessagePageRoutingModule} from './message-routing.module';

import {MessagePage} from './message.page';
import {TranslateModule} from '@ngx-translate/core';
import {MessageBoxComponent} from '@app/message/components/message-box/message-box.component';
import {MessageInstanceComponent} from '@app/message/components/message-instance/message-instance.component';


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
        MessageInstanceComponent
    ]
})
export class MessagePageModule {
}
