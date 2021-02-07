import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SearchFiltersAdditionalTabComponent } from './search-filters-additional-tab.component';

describe('SearchFiltersAdditionalTabComponent', () => {
  let component: SearchFiltersAdditionalTabComponent;
  let fixture: ComponentFixture<SearchFiltersAdditionalTabComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchFiltersAdditionalTabComponent],
        imports: [TranslateModule.forRoot(), IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
        providers: [SelectableCountryOnSearchService, SearchFilterStateService],
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
