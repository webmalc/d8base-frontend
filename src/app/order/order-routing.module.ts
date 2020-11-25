import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderConfirmationComponent} from '@app/order/components';
import {orderSteps} from './order-steps';
import {OrderPage} from './order.page';

const routes: Routes = [
    {
        path: 'done',
        pathMatch: 'full',
        component: OrderConfirmationComponent
    },
    {
        path: ':id',
        component: OrderPage,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '1'
            },
            ...orderSteps
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {
}
