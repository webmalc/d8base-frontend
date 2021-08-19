/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from '@app/infinite-scroll/infinite-scroll.module';
import { ReviewsModule } from '@app/reviews/reviews.module';
import { SearchFiltersMainTabComponent } from '@app/search/components/search-filters/search-filters-main-tab/search-filters-main-tab.component';
import { SearchFiltersSubmenuComponent } from '@app/search/components/search-filters/search-filters-submenu/search-filters-submenu.component';
import { SearchFiltersComponent } from '@app/search/components/search-filters/search-filters.component';
import { CategoryChipsComponent } from '@app/search/pages/search/applied-filters/category-chips/category-chips.component';
import { ChipComponent } from '@app/search/pages/search/applied-filters/chip/chip.component';
import { ServiceTypeChipsComponent } from '@app/search/pages/search/applied-filters/service-type-chips/service-type-chips.component';
import { SearchResultComponent } from '@app/search/pages/search/search-result/search-result.component';
import { ServiceLinkComponent } from '@app/search/pages/search/search-result/service-title/service-link.component';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { SearchFiltersAdditionalTabComponent } from './components/search-filters/search-filters-additional-tab/search-filters-additional-tab.component';
import { FiltersPage } from './pages/filters/filters.page';
import { AppliedFiltersComponent } from './pages/search/applied-filters/applied-filters.component';
import { LanguageChipsComponent } from './pages/search/applied-filters/language-chips/language-chips.component';
import { SearchPage } from './pages/search/search-page.component';
import { SearchPageGuard } from './search-page.guard';
import { SearchPageRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    TranslateModule,
    SharedModule,
    IonicSelectableModule,
    ReviewsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  declarations: [
    SearchPage,
    FiltersPage,
    SearchFiltersComponent,
    SearchFiltersSubmenuComponent,
    SearchFiltersMainTabComponent,
    SearchFiltersAdditionalTabComponent,
    SearchResultComponent,
    ServiceLinkComponent,
    AppliedFiltersComponent,
    ChipComponent,
    CategoryChipsComponent,
    ServiceTypeChipsComponent,
    LanguageChipsComponent,
  ],
  exports: [SearchFiltersComponent],
  providers: [SearchPageGuard],
})
export class SearchPageModule {}
