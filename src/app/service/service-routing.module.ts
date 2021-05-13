import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartureComponent } from '@app/service/components/departure/departure.component';
import { ServiceEditorPageComponent } from '@app/service/components/service-editor-page/service-editor-page.component';
import { ServicePublishFinalStepComponent } from '@app/service/components/service-publish-final-step/service-publish-final-step.component';
import { ServicePublishStepFiveComponent } from '@app/service/components/service-publish-step-five/service-publish-step-five.component';
import { ServicePublishStepFourComponent } from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import { ServicePublishStepOneComponent } from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import { ServicePublishStepSevenComponent } from '@app/service/components/service-publish-step-seven/service-publish-step-seven.component';
import { ServicePublishStepSixComponent } from '@app/service/components/service-publish-step-six/service-publish-step-six.component';
import { ServicePublishStepThreeComponent } from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import { ServicePublishStepTwoComponent } from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import { ServiceViewerPageComponent } from '@app/service/components/service-viewer-page/service-viewer-page.component';
import { TimetableComponent } from '@app/service/components/timetable/timetable.component';
import { ServicePublishGuardService } from '@app/service/guards/service-publish-guard.service';
import {
  ServiceInfoEditorComponent,
  ServiceScheduleEditComponent,
  ServiceTypeEditComponent,
} from './components/service-editor-page';
import { ServicePublishWrapperComponent } from './components/service-publish-wrapper/service-publish-wrapper.component';
import { ServicePublishResetStateService } from './guards/service-publish-reset-state.service';

const routes: Routes = [
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
    component: ServiceInfoEditorComponent,
  },
  {
    path: ':id/edit/location',
    component: ServiceTypeEditComponent,
  },
  {
    path: ':id/edit/schedule',
    component: ServiceScheduleEditComponent,
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
