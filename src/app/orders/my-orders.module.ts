import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from '@app/shared/infinite-scroll/infinite-scroll.module';
import {
  CancelConfirmationPopoverComponent,
  OrderStatusComponent,
  ReceivedOrderListItemComponent,
  ReceivedOrderPageComponent,
  SentOrderPageComponent,
} from '@app/orders/components';
import { InboxComponent } from '@app/orders/components/inbox/inbox.component';
import { OutboxComponent } from '@app/orders/components/outbox/outbox.component';
import { SentOrderListItemComponent } from '@app/orders/components/sent-order-list-item/sent-order-list-item.component';
import { InboxPageComponent } from '@app/orders/pages/inbox-page/inbox-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { OutboxPageComponent } from './pages/outbox-page/outbox-page.component';
import { ReceivedOrderManager, SentOrderManager } from './services';

@NgModule({
  declarations: [
    InboxPageComponent,
    OutboxPageComponent,
    OrderStatusComponent,
    InboxComponent,
    OutboxComponent,
    ReceivedOrderListItemComponent,
    SentOrderListItemComponent,
    ReceivedOrderPageComponent,
    SentOrderPageComponent,
    CancelConfirmationPopoverComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    TranslateModule,
    MyOrdersRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [ReceivedOrderManager, SentOrderManager],
})
export class MyOrdersModule {}
