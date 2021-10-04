/* eslint-disable max-len */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from '@app/shared/infinite-scroll/infinite-scroll.module';
import { ReviewsModule } from '@app/reviews/reviews.module';
import { BasicFiltersComponent } from '@app/search/components/basic-filters/basic-filters.component';
import { CategoryChipsComponent } from '@app/search/pages/search-page/applied-filters/category-chips/category-chips.component';
import { ChipComponent } from '@app/search/pages/search-page/applied-filters/chip/chip.component';
import { ServiceTypeChipsComponent } from '@app/search/pages/search-page/applied-filters/service-type-chips/service-type-chips.component';
import { SearchResultComponent } from '@app/search/pages/search-page/search-result/search-result.component';
import { ServiceLinkComponent } from '@app/search/pages/search-page/search-result/service-title/service-link.component';
import { LocationEditorModule } from '@app/shared/location-editor/location-editor.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { AdvancedFiltersComponent } from './components/advanced-filters/advanced-filters.component';
import { FiltersPageComponent } from './pages/filters-page/filters-page.component';
import { AppliedFiltersComponent } from './pages/search-page/applied-filters/applied-filters.component';
import { LanguageChipsComponent } from './pages/search-page/applied-filters/language-chips/language-chips.component';
import { SearchPage } from './pages/search-page/search-page.component';
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
    LocationEditorModule,
  ],
  declarations: [
    SearchPage,
    FiltersPageComponent,
    BasicFiltersComponent,
    AdvancedFiltersComponent,
    SearchResultComponent,
    ServiceLinkComponent,
    AppliedFiltersComponent,
    ChipComponent,
    CategoryChipsComponent,
    ServiceTypeChipsComponent,
    LanguageChipsComponent,
  ],
  providers: [SearchPageGuard],
})
export class SearchPageModule {}
