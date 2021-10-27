import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAuthenticationGuardService } from '@app/booking/guards';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
