import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderConfirmationComponent} from '@app/order/components';
import {OrderPage} from './order.page';

const routes: Routes = [
    {
        path: 'done',
        pathMatch: 'full',
        component: OrderConfirmationComponent
    },
    {
        path: ':id',
        pathMatch: 'full',
        redirectTo: ':id/0'
    },
    {
        path: ':id/:step',
        component: OrderPage,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {
}
