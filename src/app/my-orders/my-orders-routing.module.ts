import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyOrdersPageComponent} from '@app/my-orders/my-orders-page.component';

import {OrderPageComponent} from './components';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'outbox'
    },
    {
        path: 'inbox',
        pathMatch: 'full',
        component: MyOrdersPageComponent,
        data: {isInbox: true}
    },
    {
        path: 'inbox/:id',
        pathMatch: 'full',
        component: OrderPageComponent
    },
    {
        path: 'outbox',
        pathMatch: 'full',
        component: MyOrdersPageComponent,
        data: {isInbox: false}
    },
    {
        path: 'outbox/:id',
        pathMatch: 'full',
        component: OrderPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyOrdersRoutingModule {
}
