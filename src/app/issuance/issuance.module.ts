import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {IssuanceFiltersAdditionalTabComponent} from '@app/issuance/components/issuance-filters-additional-tab/issuance-filters-additional-tab.component';
import {IssuanceFiltersFactoryComponent} from '@app/issuance/components/issuance-filters-factory/issuance-filters-factory.component';
import {IssuanceFiltersMainTabComponent} from '@app/issuance/components/issuance-filters-main-tab/issuance-filters-main-tab.component';
import {IssuanceFiltersSubmenuComponent} from '@app/issuance/components/issuance-filters-submenu/issuance-filters-submenu.component';
import {IssuanceFiltersComponent} from '@app/issuance/components/issuance-filters/issuance-filters.component';
import {IssuanceFilterStateService} from '@app/issuance/services/issuance-filter-state.service';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import {IssuancePageRoutingModule} from './issuance-routing.module';
import {IssuancePage} from './issuance.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IssuancePageRoutingModule,
        TranslateModule,
        SharedModule,
        IonicSelectableModule
    ],
    declarations: [
        IssuancePage,
        IssuanceFiltersComponent,
        IssuanceFiltersSubmenuComponent,
        IssuanceFiltersFactoryComponent,
        IssuanceFiltersMainTabComponent,
        IssuanceFiltersAdditionalTabComponent
    ],
    providers: [
        IssuanceFilterStateService
    ]
})
export class IssuancePageModule {
}
