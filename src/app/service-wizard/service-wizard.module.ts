import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { ServiceDetailsFormComponent, ServiceInfoFormComponent } from './components';
import {
  CategoryServiceStepComponent,
  ServiceDetailsStepComponent,
  ServiceFirstStepGuardService,
  ServiceInfoStepComponent,
  ServiceStepContainerComponent,
  ServiceWizardPage,
  ServiceWizardResetStateService,
  ServiceWizardStateService,
} from './pages/service-wizard-page';
import { ServiceWizardRoutingModule } from './service-wizard-routing.module';

@NgModule({
  declarations: [
    ServiceWizardPage,
    ServiceStepContainerComponent,
    CategoryServiceStepComponent,
    ServiceInfoFormComponent,
    ServiceInfoStepComponent,
    ServiceDetailsFormComponent,
    ServiceDetailsStepComponent,
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
  ],
  providers: [ServiceFirstStepGuardService, ServiceWizardStateService, ServiceWizardResetStateService],
})
export class ServiceWizardModule {}
