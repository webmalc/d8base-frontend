import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAuthenticationGuardService, OrderFirstStepGuardService } from '@app/order/guards';
import { ClientIdentificationComponent } from './components/';
import { ORDER_STEPS, stepsRoutes } from './order-steps';
import { OrderPage } from './order.page';

const routes: Routes = [
  {
    path: ':serviceId',
    component: OrderPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${ORDER_STEPS.ids[0]}`,
      },
      ...stepsRoutes([OrderAuthenticationGuardService]),
      {
        path: 'contact-info',
        pathMatch: 'full',
        component: ClientIdentificationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
