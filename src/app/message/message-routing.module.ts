import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatsListPageComponent, ChatPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ChatsListPageComponent,
  },
  {
    path: 'chat/:interlocutor-id',
    component: ChatPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagePageRoutingModule {}
