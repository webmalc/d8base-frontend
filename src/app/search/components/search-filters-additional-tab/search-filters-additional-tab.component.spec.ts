import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RatingPickerComponent } from '@app/reviews/components/rating-picker/rating-picker.component';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { SearchFiltersAdditionalTabComponent } from './search-filters-additional-tab.component';

describe('SearchFiltersAdditionalTabComponent', () => {
  let component: SearchFiltersAdditionalTabComponent;
  let fixture: ComponentFixture<SearchFiltersAdditionalTabComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchFiltersAdditionalTabComponent, IonicSelectableComponent, RatingPickerComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [SelectableCountryOnSearchService, SearchFilterStateService, FormBuilder],
      }).compileComponents();

      fixture = TestBed.createComponent(SearchFiltersAdditionalTabComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
