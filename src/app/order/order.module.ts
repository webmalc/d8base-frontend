import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OrderRoutingModule} from './order-routing.module';
import {OrderPage} from './order.page';


@NgModule({
    declarations: [
        OrderPage
    ],
    imports: [
        CommonModule,
        OrderRoutingModule
    ]
})
export class OrderModule {
}
