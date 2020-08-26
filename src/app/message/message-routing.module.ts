import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DirectComponent} from '@app/message/components/direct/direct.component';
import {MessagesComponent} from '@app/message/components/messages/messages.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: MessagesComponent,
    },
    {
        path: 'chat/:interlocutor-id',
        component: DirectComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagePageRoutingModule {
}
