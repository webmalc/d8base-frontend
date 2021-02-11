import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OrderStatusComponent,
  ReceivedOrderListItemComponent,
  ReceivedOrderPageComponent,
  SentOrderPageComponent,
} from '@app/my-orders/components';
import { InboxComponent } from '@app/my-orders/components/inbox/inbox.component';
import { OutboxComponent } from '@app/my-orders/components/outbox/outbox.component';
import { SentOrderListItemComponent } from '@app/my-orders/components/sent-order-list-item/sent-order-list-item.component';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MyOrdersPageComponent } from './my-orders-page.component';
import { MyOrdersRoutingModule } from './my-orders-routing.module';
import { ReceiverOrderStatusController, SentOrderStatusController } from './services';

@NgModule({
  declarations: [
    MyOrdersPageComponent,
    OrderStatusComponent,
    InboxComponent,
    OutboxComponent,
    ReceivedOrderListItemComponent,
    SentOrderListItemComponent,
    ReceivedOrderPageComponent,
    SentOrderPageComponent,
  ],
  imports: [CommonModule, SharedModule, IonicModule, TranslateModule, MyOrdersRoutingModule, ReactiveFormsModule],
  providers: [ReceiverOrderStatusController, SentOrderStatusController],
})
export class MyOrdersModule {}
