import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IssuancePageRoutingModule} from './issuance-routing.module';
import {IssuancePage} from './issuance.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IssuancePageRoutingModule,
        TranslateModule
    ],
    declarations: [IssuancePage]
})
export class IssuancePageModule {
}
