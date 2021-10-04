import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { SearchPageModule } from '@app/search/search.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { AdvancedFiltersComponent } from './advanced-filters.component';

describe('SearchFiltersAdditionalTabComponent', () => {
  let component: AdvancedFiltersComponent;
  let fixture: ComponentFixture<AdvancedFiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [...RootModules(), ComponentTestingModule, SearchPageModule],
        providers: [SearchFilterStateService, FormBuilder],
      }).compileComponents();

      fixture = TestBed.createComponent(AdvancedFiltersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
