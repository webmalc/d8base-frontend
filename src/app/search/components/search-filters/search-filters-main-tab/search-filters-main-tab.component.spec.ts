import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { CurrentPositionService } from '@app/core/services/location/current-position.service';
import { IpApiService } from '@app/core/services/location/ip-api.service';
import { IpDataService } from '@app/core/services/location/ip-data.service';
import { IpServicesHolderService } from '@app/core/services/location/ip-services-holder.service';
import { IpnfDataService } from '@app/core/services/location/ipnf-data.service';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { LocationServiceMock, StorageManagerMock } from '../../../../../testing/mocks';
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
          IpServicesHolderService,
          IpApiService,
          IpDataService,
          IpnfDataService,
          { provide: CurrentPositionService, useClass: LocationServiceMock },
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
