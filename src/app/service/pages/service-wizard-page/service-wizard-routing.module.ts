import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWizardPage } from './service-wizard-page.component';
import { ServiceFirstStepGuardService, ServiceWizardResetStateService } from './guards';
import { SERVICE_STEPS, stepsRoutes } from './service-wizard-steps';

const routes: Routes = [
  {
    path: '',
    component: ServiceWizardPage,
    canDeactivate: [ServiceWizardResetStateService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${SERVICE_STEPS[0].id}`,
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
