import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from '../../../../../testing/mocks';
import { SearchFiltersMainTabComponent } from './search-filters-main-tab.component';

describe('SearchFiltersMainTabComponent', () => {
  let component: SearchFiltersMainTabComponent;
  let fixture: ComponentFixture<SearchFiltersMainTabComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchFiltersMainTabComponent, IonicSelectableComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          SearchFilterStateService,
          { provide: StorageManagerService, useClass: StorageManagerMock },
          FormBuilder,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SearchFiltersMainTabComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
