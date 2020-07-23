import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DepartureComponent} from '@app/service/components/departure/departure.component';
import {ServicePublishStepFiveComponent} from '@app/service/components/service-publish-step-five/service-publish-step-five.component';
import {ServicePublishStepFourComponent} from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import {ServicePublishStepOneComponent} from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import {ServicePublishStepSevenComponent} from '@app/service/components/service-publish-step-seven/service-publish-step-seven.component';
import {ServicePublishStepSixComponent} from '@app/service/components/service-publish-step-six/service-publish-step-six.component';
import {ServicePublishStepThreeComponent} from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import {ServicePublishStepTwoComponent} from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import {TimetableComponent} from '@app/service/components/timetable/timetable.component';
import {ServicePublishStepFiveFormService} from '@app/service/forms/service-publish-step-five-form.service';
import {ServicePublishStepFourFormService} from '@app/service/forms/service-publish-step-four-form.service';
import {ServicePublishStepOneFormService} from '@app/service/forms/service-publish-step-one-form.service';
import {ServicePublishStepSevenDepartureFormService} from '@app/service/forms/service-publish-step-seven-departure-form.service';
import {ServicePublishStepSevenFormService} from '@app/service/forms/service-publish-step-seven-form.service';
import {ServicePublishStepSevenTimetableFormService} from '@app/service/forms/service-publish-step-seven-timetable-form.service';
import {ServicePublishStepSixFormService} from '@app/service/forms/service-publish-step-six-form.service';
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
        ServicePublishStepThreeComponent,
        ServicePublishStepFourComponent,
        ServicePublishStepFiveComponent,
        ServicePublishStepSixComponent,
        ServicePublishStepSevenComponent,
        TimetableComponent,
        DepartureComponent
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
        ServicePublishStepThreeGuardService,
        ServicePublishStepFourFormService,
        ServicePublishStepFiveFormService,
        ServicePublishStepSixFormService,
        ServicePublishStepSevenFormService,
        ServicePublishStepSevenDepartureFormService,
        ServicePublishStepSevenTimetableFormService
    ]
})
export class ServicePageModule {}
