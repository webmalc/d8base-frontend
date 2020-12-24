import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationPageModule} from '@app/auth/pages/registration/registration.module';
import {
    ClientDetailsStepComponent, ClientIdentificationComponent,
    DateTimeStepComponent,
    LocationStepComponent,
    OrderConfirmationComponent,
    SummaryStepComponent
} from '@app/order/components';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import {StepContainerComponent} from './components/step-container/step-container.component';
import {OrderAuthenticationGuardService, OrderFirstStepGuardService} from './guards';
import {OrderRoutingModule} from './order-routing.module';
import {OrderPage} from './order.page';
import {OrderWizardStateService} from './services';

@NgModule({
    declarations: [
        OrderPage,
        DateTimeStepComponent,
        LocationStepComponent,
        ClientDetailsStepComponent,
        SummaryStepComponent,
        OrderConfirmationComponent,
        StepContainerComponent,
        ClientIdentificationComponent
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
        RegistrationPageModule
    ],
    providers: [OrderFirstStepGuardService, OrderAuthenticationGuardService, OrderWizardStateService]
})
export class OrderPageModule {
}
