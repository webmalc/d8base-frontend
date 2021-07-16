import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ServiceFirstStepGuardService,
  ServiceWizardPage,
  ServiceWizardResetStateService,
} from './pages/service-wizard-page';
import { SERVICE_STEPS, stepsRoutes } from './pages/service-wizard-page/service-wizard-steps';

const routes: Routes = [
  {
    path: '',
    component: ServiceWizardPage,
    canDeactivate: [ServiceWizardResetStateService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${SERVICE_STEPS.ids[0]}`,
      },
      ...stepsRoutes([ServiceFirstStepGuardService]),
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceWizardRoutingModule {}
