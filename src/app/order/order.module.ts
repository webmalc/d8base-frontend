import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageModule } from '@app/auth/pages/registration/registration.module';
import { ClientDetailsStepComponent, DateTimeStepComponent, ConfirmationStepComponent } from '@app/order/components';
import { LocationEditorModule } from '@app/shared/location-editor/location-editor.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { StepContainerComponent } from './components/step-container/step-container.component';
import { OrderAuthenticationGuardService, OrderFirstStepGuardService } from './guards';
import { OrderRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';
import { OrderLocationsService, OrderWizardStateService } from './services';

@NgModule({
  declarations: [
    OrderPage,
    DateTimeStepComponent,
    ClientDetailsStepComponent,
    StepContainerComponent,
    ConfirmationStepComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    TranslateModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IonicSelectableModule,
    RegistrationPageModule,
    LocationEditorModule,
  ],
  providers: [
    OrderFirstStepGuardService,
    OrderAuthenticationGuardService,
    OrderWizardStateService,
    OrderLocationsService,
  ],
})
export class OrderPageModule {}
