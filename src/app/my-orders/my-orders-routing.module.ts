import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersPageComponent } from '@app/my-orders/my-orders-page.component';

import { ReceivedOrderPageComponent, SentOrderPageComponent } from './components';
import { OrderReviewComponent } from './components/order-review/order-review.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'outbox',
  },
  {
    path: 'inbox',
    pathMatch: 'full',
    component: MyOrdersPageComponent,
    data: { isInbox: true },
  },
  {
    path: 'inbox/:id',
    pathMatch: 'full',
    component: ReceivedOrderPageComponent,
  },
  {
    path: 'outbox',
    pathMatch: 'full',
    component: MyOrdersPageComponent,
    data: { isInbox: false },
  },
  {
    path: 'outbox/:id',
    pathMatch: 'full',
    component: SentOrderPageComponent,
  },
  {
    path: 'review/:orderId',
    pathMatch: 'full',
    component: OrderReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrdersRoutingModule {
}
