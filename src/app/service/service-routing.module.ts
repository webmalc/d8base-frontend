import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ServicePublishStepOneComponent} from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import {ServicePublishStepThreeComponent} from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import {ServicePublishStepTwoComponent} from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import {ServicePublishStepThreeGuardService} from '@app/service/guards/service-publish-step-three-guard.service';
import {ServicePublishStepTwoGuardService} from '@app/service/guards/service-publish-step-two-guard.service';
import { ServicePage } from './service.page';

const routes: Routes = [
    {
        path: '',
        component: ServicePage
    },
    {
        path: 'publish/step-one',
        component: ServicePublishStepOneComponent
    },
    {
        path: 'publish/step-two',
        component: ServicePublishStepTwoComponent,
        canActivate: [ServicePublishStepTwoGuardService]
    },
    {
        path: 'publish/step-three',
        component: ServicePublishStepThreeComponent,
        // canActivate: [ServicePublishStepThreeGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ServicePageRoutingModule {}
