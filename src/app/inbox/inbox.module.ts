import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OrderListItemComponent, OrderStatusComponent} from '@app/inbox/components';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {InboxPageComponent} from './inbox-page.component';
import {InboxRoutingModule} from './inbox-routing.module';


@NgModule({
    declarations: [
        InboxPageComponent,
        OrderListItemComponent,
        OrderStatusComponent
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
