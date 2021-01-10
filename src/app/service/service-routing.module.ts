import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartureComponent } from '@app/service/components/departure/departure.component';
import { ServiceDetailsPageComponent } from '@app/service/components/service-details-page/service-details-page.component';
import { ServicePublishFinalStepComponent } from '@app/service/components/service-publish-final-step/service-publish-final-step.component';
import { ServicePublishStepFiveComponent } from '@app/service/components/service-publish-step-five/service-publish-step-five.component';
import { ServicePublishStepFourComponent } from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import { ServicePublishStepOneComponent } from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import { ServicePublishStepSevenComponent } from '@app/service/components/service-publish-step-seven/service-publish-step-seven.component';
import { ServicePublishStepSixComponent } from '@app/service/components/service-publish-step-six/service-publish-step-six.component';
import { ServicePublishStepThreeComponent } from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import { ServicePublishStepTwoComponent } from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import { TimetableComponent } from '@app/service/components/timetable/timetable.component';
import { ServicePublishGuardService } from '@app/service/guards/service-publish-guard.service';
import { ServicePage } from './service.page';

const routes: Routes = [
  {
    path: '',
    component: ServicePage,
  },
  {
    path: 'publish',
    pathMatch: 'full',
    redirectTo: 'publish/step-one',
  },
  {
    path: 'publish/step-one',
    component: ServicePublishStepOneComponent,
  },
  {
    path: 'publish/step-two',
    component: ServicePublishStepTwoComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: 'publish/step-three',
    component: ServicePublishStepThreeComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: 'publish/step-four',
    component: ServicePublishStepFourComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: 'publish/step-five',
    component: ServicePublishStepFiveComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: 'publish/step-six',
    component: ServicePublishStepSixComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: 'publish/step-seven',
    component: ServicePublishStepSevenComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: 'publish/step-seven/timetable',
    component: TimetableComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: 'publish/step-seven/departure',
    component: DepartureComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: 'publish/final',
    component: ServicePublishFinalStepComponent,
    canActivate: [ServicePublishGuardService],
  },
  {
    path: ':id',
    component: ServiceDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicePageRoutingModule {
}

