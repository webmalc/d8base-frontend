import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicePageRoutingModule } from './service-routing.module';

import {ServicePublishStepOneComponent} from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import {ServicePublishStepTwoComponent} from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import {ServicePublishStepOneFormService} from '@app/service/forms/service-publish-step-one-form.service';
import {ServicePublishStepTwoFormService} from '@app/service/forms/service-publish-step-two-form.service';
import {ServicePublishStepTwoGuardService} from '@app/service/guards/service-publish-step-two-guard.service';
import {PricesApiService} from '@app/service/services/prices-api.service';
import {ServiceLocationApiService} from '@app/service/services/service-location-api.service';
import {ServicePhotoApiService} from '@app/service/services/service-photo-api.service';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {ServiceTagsApiService} from '@app/service/services/service-tags-api.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import { ServicePage } from './service.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ServicePageRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
        IonicSelectableModule
    ],
    declarations: [
        ServicePage,
        ServicePublishStepOneComponent,
        ServicePublishStepTwoComponent
    ],
    providers: [
        PricesApiService,
        ServicesApiService,
        ServiceTagsApiService,
        ServiceLocationApiService,
        ServicePhotoApiService,
        ServicePublishService,
        ServicePublishStepOneFormService,
        ServicePublishStepTwoFormService,
        ServicePublishStepTwoGuardService
    ]
})
export class ServicePageModule {}
