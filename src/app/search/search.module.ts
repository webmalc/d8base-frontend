import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SearchFiltersAdditionalTabComponent} from '@app/search/components/search-filters-additional-tab/search-filters-additional-tab.component';
import {SearchFiltersMainTabComponent} from '@app/search/components/search-filters-main-tab/search-filters-main-tab.component';
import {SearchFiltersSubmenuComponent} from '@app/search/components/search-filters-submenu/search-filters-submenu.component';
import {SearchFiltersComponent} from '@app/search/components/search-filters/search-filters.component';
import {SearchResultComponent} from '@app/search/components/search-result/search-result.component';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import { FiltersGuard } from './guards/filters.guard';
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
        SearchFiltersMainTabComponent,
        SearchFiltersAdditionalTabComponent,
        SearchResultComponent
    ],
    exports: [SearchFiltersComponent],
    providers: [SearchFilterStateService, FiltersGuard]
})
export class SearchPageModule {}
