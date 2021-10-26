import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxPageComponent } from './pages/inbox-page/inbox-page.component';
import { OutboxPageComponent } from './pages/outbox-page/outbox-page.component';
import { ReceivedOrderPageComponent, SentOrderPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'outbox',
  },
  {
    path: 'inbox',
    pathMatch: 'full',
    component: InboxPageComponent,
  },
  {
    path: 'inbox/:id',
    pathMatch: 'full',
    component: ReceivedOrderPageComponent,
  },
  {
    path: 'outbox',
    pathMatch: 'full',
    component: OutboxPageComponent,
  },
  {
    path: 'outbox/:id',
    pathMatch: 'full',
    component: SentOrderPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOrdersRoutingModule {}
