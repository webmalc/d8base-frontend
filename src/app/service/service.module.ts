import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageModule } from '@app/auth/pages/registration/registration.module';
import { DepartureComponent } from '@app/service/components/departure/departure.component';
import { MasterPickerPopoverComponent } from '@app/service/components/master-peeker/master-picker-popover.component';
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
import { ServicePublishStepFiveFormService } from '@app/service/forms/service-publish-step-five-form.service';
import { ServicePublishStepFourFormService } from '@app/service/forms/service-publish-step-four-form.service';
import { ServicePublishStepOneFormService } from '@app/service/forms/service-publish-step-one-form.service';
import { ServicePublishStepSevenDepartureFormService } from '@app/service/forms/service-publish-step-seven-departure-form.service';
import { ServicePublishStepSevenFormService } from '@app/service/forms/service-publish-step-seven-form.service';
import { ServicePublishStepSixFormService } from '@app/service/forms/service-publish-step-six-form.service';
import { ServicePublishStepTwoFormService } from '@app/service/forms/service-publish-step-two-form.service';
import { ServicePublishGuardService } from '@app/service/guards/service-publish-guard.service';
import { PricesApiService } from '@app/service/services/prices-api.service';
import { ServiceLocationApiService } from '@app/service/services/service-location-api.service';
import { ServicePhotoApiService } from '@app/service/services/service-photo-api.service';
import { ServicePublishAuthStateManagerService } from '@app/service/services/service-publish-auth-state-manager.service';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from '@app/service/services/service-publish-data-preparer.service';
import { ServicePublishService } from '@app/service/services/service-publish.service';
import { ServiceScheduleApiService } from '@app/service/services/service-schedule-api.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { ServiceTagsApiService } from '@app/service/services/service-tags-api.service';
import { ServicesApiService } from '@app/service/services/services-api.service';
import { ChainManagerService } from '@app/service/services/steps-navigation-chain/chain-manager.service';
import { StepFinalHandlerService } from '@app/service/services/steps-navigation-chain/step-final-handler.service';
import { StepFiveHandlerService } from '@app/service/services/steps-navigation-chain/step-five-handler.service';
import { StepFourHandlerService } from '@app/service/services/steps-navigation-chain/step-four-handler.service';
import { StepOneHandlerService } from '@app/service/services/steps-navigation-chain/step-one-handler.service';
import { StepSevenHandlerService } from '@app/service/services/steps-navigation-chain/step-seven-handler.service';
import { StepSixHandlerService } from '@app/service/services/steps-navigation-chain/step-six-handler.service';
import { StepThreeHandlerService } from '@app/service/services/steps-navigation-chain/step-three-handler.service';
import { StepTwoHandlerService } from '@app/service/services/steps-navigation-chain/step-two-handler.service';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BrMaskerModule } from 'br-mask';
import { IonicSelectableModule } from 'ionic-selectable';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ServiceEditorPageComponent } from './components/service-editor-page/service-editor-page.component';
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
    NgxDropzoneModule,
    BrMaskerModule,
    RegistrationPageModule,
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
    DepartureComponent,
    ServicePublishFinalStepComponent,
    MasterPickerPopoverComponent,
    ServiceDetailsPageComponent,
    ServiceEditorPageComponent,
  ],
  providers: [
    PricesApiService,
    ServicesApiService,
    ServiceTagsApiService,
    ServiceLocationApiService,
    ServicePhotoApiService,
    ServicePublishDataHolderService,
    ServicePublishStepOneFormService,
    ServicePublishStepTwoFormService,
    ServicePublishStepFourFormService,
    ServicePublishStepFiveFormService,
    ServicePublishStepSixFormService,
    ServicePublishStepSevenFormService,
    ServicePublishStepSevenDepartureFormService,
    ServiceScheduleApiService,
    ServiceStepsNavigationService,
    ServicePublishService,
    ServicePublishDataPreparerService,
    ChainManagerService,
    StepOneHandlerService,
    StepTwoHandlerService,
    StepThreeHandlerService,
    StepFourHandlerService,
    StepFiveHandlerService,
    StepSixHandlerService,
    StepSevenHandlerService,
    StepFinalHandlerService,
    ServicePublishAuthStateManagerService,
    ServicePublishGuardService,
  ],
})
export class ServicePageModule {
}
