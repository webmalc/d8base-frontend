import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ServicePublishStepOneComponent} from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import {ServicePublishStepTwoComponent} from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ServicePageRoutingModule {}
