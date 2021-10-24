import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBranch } from '@app/core/constants/navigation.constants';

import { DepartureComponent } from '@app/service/components/departure/departure.component';
import { ServiceEditorPageComponent } from '@app/service/pages/service-editor-page/service-editor-page.component';
import { ServicePublishFinalStepComponent } from '@app/service/components/service-publish-final-step/service-publish-final-step.component';
import { ServicePublishStepFiveComponent } from '@app/service/components/service-publish-step-five/service-publish-step-five.component';
import { ServicePublishStepFourComponent } from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import { ServicePublishStepOneComponent } from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import { ServicePublishStepSevenComponent } from '@app/service/components/service-publish-step-seven/service-publish-step-seven.component';
import { ServicePublishStepSixComponent } from '@app/service/components/service-publish-step-six/service-publish-step-six.component';
import { ServicePublishStepThreeComponent } from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import { ServicePublishStepTwoComponent } from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import { ServiceViewerPageComponent } from '@app/service/pages/service-viewer-page/service-viewer-page.component';
import { TimetableComponent } from '@app/service/components/timetable/timetable.component';
import { ServicePublishGuardService } from '@app/service/guards/service-publish-guard.service';
import { ServiceCreatedPageComponent } from '@app/service/pages/service-created-page';
import {
  ServiceDetailsEditComponent,
  ServiceEssentialsEditorComponent,
  ServiceTypeEditComponent,
} from './pages/service-editor-page';
import { ServicePublishWrapperComponent } from './components/service-publish-wrapper/service-publish-wrapper.component';
import { ServicePublishResetStateService } from './guards/service-publish-reset-state.service';
import { ServiceResolver } from './service.resolver';
import { ProfessionalResolver } from './professional.resolver';

const routes: Routes = [
  {
    path: NavBranch.Add,
    loadChildren: () => import('./pages/service-wizard-page/service-wizard.module').then(m => m.ServiceWizardModule),
  },
  {
    path: 'publish',
    canDeactivate: [ServicePublishResetStateService],
    component: ServicePublishWrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'step-one',
      },
      {
        path: 'step-one',
        component: ServicePublishStepOneComponent,
      },
      {
        path: 'step-two',
        component: ServicePublishStepTwoComponent,
        canActivate: [ServicePublishGuardService],
      },
      {
        path: 'step-three',
        component: ServicePublishStepThreeComponent,
        canActivate: [ServicePublishGuardService],
      },
      {
        path: 'step-four',
        component: ServicePublishStepFourComponent,
        canActivate: [ServicePublishGuardService],
      },
      {
        path: 'step-five',
        component: ServicePublishStepFiveComponent,
        canActivate: [ServicePublishGuardService],
      },
      {
        path: 'step-six',
        component: ServicePublishStepSixComponent,
        canActivate: [ServicePublishGuardService],
      },
      {
        path: 'step-seven',
        component: ServicePublishStepSevenComponent,
        canActivate: [ServicePublishGuardService],
      },
      {
        path: 'step-seven/timetable',
        component: TimetableComponent,
        canActivate: [ServicePublishGuardService],
      },
      {
        path: 'step-seven/departure',
        component: DepartureComponent,
        canActivate: [ServicePublishGuardService],
      },
      {
        path: 'final',
        component: ServicePublishFinalStepComponent,
        canActivate: [ServicePublishGuardService],
      },
    ],
  },

  {
    path: ':id/edit',
    component: ServiceEditorPageComponent,
  },
  {
    path: ':id/edit/info',
    component: ServiceEssentialsEditorComponent,
  },
  {
    path: ':id/edit/time-and-place',
    component: ServiceTypeEditComponent,
  },
  {
    path: ':id/edit/description',
    component: ServiceDetailsEditComponent,
  },
  {
    path: ':id/success',
    component: ServiceCreatedPageComponent,
    resolve: {
      service: ServiceResolver,
      professional: ProfessionalResolver,
    },
  },
  {
    path: ':id',
    component: ServiceViewerPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicePageRoutingModule {}
