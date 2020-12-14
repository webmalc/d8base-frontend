import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderConfirmationComponent} from './components';
import {OrderFirstStepGuardService} from './guards/order-first-step-guard.service';
import {ORDER_STEPS, stepsRoutes} from './order-steps';
import {OrderPage} from './order.page';

const routes: Routes = [
    {
        path: ':serviceId',
        component: OrderPage,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: `${ORDER_STEPS.ids[0]}`
            },
            ...stepsRoutes([OrderFirstStepGuardService]),
            {
                path: 'done',
                pathMatch: 'full',
                component: OrderConfirmationComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {}
