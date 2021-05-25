import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { IonicModule } from '@ionic/angular';
import { SearchFiltersComponent } from './search-filters.component';

xdescribe('SearchFiltersComponent', () => {
  let component: SearchFiltersComponent;
  let fixture: ComponentFixture<SearchFiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchFiltersComponent],
        imports: [IonicModule.forRoot()],
        providers: [SearchFilterStateService],
      }).compileComponents();

      fixture = TestBed.createComponent(SearchFiltersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
