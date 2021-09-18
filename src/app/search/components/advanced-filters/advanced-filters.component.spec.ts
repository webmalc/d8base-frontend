import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RatingPickerComponent } from '@app/reviews/components/rating-picker/rating-picker.component';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { AdvancedFiltersComponent } from './advanced-filters.component';

describe('SearchFiltersAdditionalTabComponent', () => {
  let component: AdvancedFiltersComponent;
  let fixture: ComponentFixture<AdvancedFiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AdvancedFiltersComponent, IonicSelectableComponent, RatingPickerComponent],
        imports: [...RootModules(), ComponentTestingModule],
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
