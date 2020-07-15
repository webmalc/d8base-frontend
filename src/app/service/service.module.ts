import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicePublishStepOneComponent} from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import {ServicePublishStepThreeComponent} from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import {ServicePublishStepTwoComponent} from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import {ServicePublishStepOneFormService} from '@app/service/forms/service-publish-step-one-form.service';
import {ServicePublishStepTwoFormService} from '@app/service/forms/service-publish-step-two-form.service';
import {ServicePublishStepThreeGuardService} from '@app/service/guards/service-publish-step-three-guard.service';
import {ServicePublishStepTwoGuardService} from '@app/service/guards/service-publish-step-two-guard.service';
import {PricesApiService} from '@app/service/services/prices-api.service';
import {ServiceLocationApiService} from '@app/service/services/service-location-api.service';
import {ServicePhotoApiService} from '@app/service/services/service-photo-api.service';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {ServiceTagsApiService} from '@app/service/services/service-tags-api.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {SharedModule} from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { ServicePageRoutingModule } from './service-routing.module';
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
        IonicSelectableModule,
        NgxDropzoneModule
    ],
    declarations: [
        ServicePage,
        ServicePublishStepOneComponent,
        ServicePublishStepTwoComponent,
        ServicePublishStepThreeComponent
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
        ServicePublishStepTwoGuardService,
        ServicePublishStepThreeGuardService
    ]
})
export class ServicePageModule {}
