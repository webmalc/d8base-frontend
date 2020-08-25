import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MessagesComponent} from '@app/message/components/messages/messages.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: MessagesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagePageRoutingModule {
}
