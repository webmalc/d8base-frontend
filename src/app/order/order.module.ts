import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
    ClientDetailsStepComponent,
    DateTimeStepComponent,
    LocationStepComponent,
    OrderConfirmationComponent,
    OrderDetailsComponent,
    SummaryStepComponent
} from '@app/order/components';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {OrderRoutingModule} from './order-routing.module';
import {OrderPage} from './order.page';
import {OrderWizardStateService} from './services/order-wizard-state.service';


@NgModule({
    declarations: [
        OrderPage,
        OrderDetailsComponent,
        DateTimeStepComponent,
        LocationStepComponent,
        ClientDetailsStepComponent,
        SummaryStepComponent,
        OrderConfirmationComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        TranslateModule,
        OrderRoutingModule
    ],
    providers: [
        OrderWizardStateService
    ]
})
export class OrderPageModule {
}
