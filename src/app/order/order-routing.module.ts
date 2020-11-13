import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {orderSteps} from './order-steps';
import {OrderPage} from './order.page';

const routes: Routes = [
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
