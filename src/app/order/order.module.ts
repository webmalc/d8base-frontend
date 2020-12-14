import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ClientDetailsStepComponent,
    DateTimeStepComponent,
    LocationStepComponent,
    OrderConfirmationComponent,
    SummaryStepComponent
} from '@app/order/components';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StepContainerComponent } from './components/step-container/step-container.component';
import { OrderFirstStepGuardService } from './guards/order-first-step-guard.service';
import { OrderRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';
import { OrderWizardStateService } from './services/order-wizard-state.service';

@NgModule({
    declarations: [
        OrderPage,
        DateTimeStepComponent,
        LocationStepComponent,
        ClientDetailsStepComponent,
        SummaryStepComponent,
        OrderConfirmationComponent,
        StepContainerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        TranslateModule,
        OrderRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [OrderFirstStepGuardService, OrderWizardStateService]
})
export class OrderPageModule {}
