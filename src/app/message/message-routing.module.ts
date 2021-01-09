import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ChatsComponent} from '@app/message/components/chats/chats.component';
import {DirectComponent} from '@app/message/components/direct/direct.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
    {
        path: 'list',
        component: ChatsComponent,
    },
    {
        path: 'chat/:interlocutor-id',
        component: DirectComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagePageRoutingModule {
}
