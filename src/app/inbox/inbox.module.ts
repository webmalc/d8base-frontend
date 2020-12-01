import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {InboxPageComponent} from './inbox-page.component';
import {InboxRoutingModule} from './inbox-routing.module';


@NgModule({
    declarations: [
        InboxPageComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        TranslateModule,
        InboxRoutingModule
    ]
})
export class InboxModule {
}
