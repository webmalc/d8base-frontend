import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IssuancePageModule} from '@app/issuance/issuance.module';
import {IonicModule} from '@ionic/angular';
import {FiltersPageRoutingModule} from './filters-routing.module';
import {FiltersPage} from './filters.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FiltersPageRoutingModule,
        IssuancePageModule
    ],
    declarations: [FiltersPage]
})
export class FiltersPageModule {
}
