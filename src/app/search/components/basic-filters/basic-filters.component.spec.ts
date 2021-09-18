import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';
import { BasicFiltersComponent } from './basic-filters.component';

describe('SearchFiltersMainTabComponent', () => {
  let component: BasicFiltersComponent;
  let fixture: ComponentFixture<BasicFiltersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BasicFiltersComponent, IonicSelectableComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          SearchFilterStateService,
          { provide: StorageManagerService, useClass: StorageManagerMock },
          FormBuilder,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicFiltersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
