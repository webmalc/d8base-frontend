import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from '@app/infinite-scroll/infinite-scroll.module';
import {
  CancelConfirmationPopoverComponent,
  OrderStatusComponent,
  ReceivedOrderListItemComponent,
  ReceivedOrderPageComponent,
  SentOrderPageComponent,
} from '@app/my-orders/components';
import { InboxComponent } from '@app/my-orders/components/inbox/inbox.component';
import { OutboxComponent } from '@app/my-orders/components/outbox/outbox.component';
import { SentOrderListItemComponent } from '@app/my-orders/components/sent-order-list-item/sent-order-list-item.component';
import { InboxPageComponent } from '@app/my-orders/pages/inbox-page/inbox-page.component';
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
