import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DateTimeStepComponent, LocationStepComponent, SummaryStepComponent} from '@app/order/components';
import {OrderDetailsComponent} from '@app/order/components/order-details/order-details.component';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {OrderRoutingModule} from './order-routing.module';
import {OrderPage} from './order.page';


@NgModule({
    declarations: [
        OrderPage,
        OrderDetailsComponent,
        DateTimeStepComponent,
        LocationStepComponent,
        SummaryStepComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        TranslateModule,
        OrderRoutingModule
    ]
})
export class OrderPageModule {
}
