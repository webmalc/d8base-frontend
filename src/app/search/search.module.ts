import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {SearchFiltersAdditionalTabComponent} from '@app/search/components/search-filters-additional-tab/search-filters-additional-tab.component';
import {SearchFiltersFactoryComponent} from '@app/search/components/search-filters-factory/search-filters-factory.component';
import {SearchFiltersMainTabComponent} from '@app/search/components/search-filters-main-tab/search-filters-main-tab.component';
import {SearchFiltersSubmenuComponent} from '@app/search/components/search-filters-submenu/search-filters-submenu.component';
import {SearchFiltersComponent} from '@app/search/components/search-filters/search-filters.component';
import {SearchResultComponent} from '@app/search/components/search-result/search-result.component';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';
import {SearchService} from '@app/search/services/search.service';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import {SearchPage} from './search-page.component';
import {SearchPageRoutingModule} from './search-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchPageRoutingModule,
        TranslateModule,
        SharedModule,
        IonicSelectableModule
    ],
    declarations: [
        SearchPage,
        SearchFiltersComponent,
        SearchFiltersSubmenuComponent,
        SearchFiltersFactoryComponent,
        SearchFiltersMainTabComponent,
        SearchFiltersAdditionalTabComponent,
        SearchResultComponent
    ],
    exports: [
        SearchFiltersComponent
    ],
    providers: [
        SearchFilterStateService,
        SearchService
    ]
})
export class SearchPageModule {
}
