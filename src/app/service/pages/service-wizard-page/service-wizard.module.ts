import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CategoryServiceStepComponent,
  ServiceConditionsStepComponent,
  ServiceDetailsStepComponent,
  ServiceEssentialsStepComponent,
  ServiceSummaryStepComponent,
} from '@app/service/pages/service-wizard-page/components';
import { LocationEditorModule } from '@app/shared/location-editor/location-editor.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';

import { ServiceStepContainerComponent } from './components/service-step-container/service-step-container.component';
import { ServiceFirstStepGuardService, ServiceWizardResetStateService } from './guards';
import { ServiceWizardPage } from './service-wizard-page.component';
import { ServiceWizardRoutingModule } from './service-wizard-routing.module';
import { ServiceBuilderService, ServiceWizardStateService } from './services';

@NgModule({
  declarations: [
    ServiceWizardPage,
    ServiceStepContainerComponent,
    CategoryServiceStepComponent,
    ServiceEssentialsStepComponent,
    ServiceDetailsStepComponent,
    ServiceConditionsStepComponent,
    ServiceSummaryStepComponent,
  ],
  imports: [
    CommonModule,
    ServiceWizardRoutingModule,
    SharedModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    IonicSelectableModule,
    LocationEditorModule,
  ],
  providers: [
    ServiceFirstStepGuardService,
    ServiceWizardStateService,
    ServiceWizardResetStateService,
    ServiceBuilderService,
  ],
})
export class ServiceWizardModule {}
