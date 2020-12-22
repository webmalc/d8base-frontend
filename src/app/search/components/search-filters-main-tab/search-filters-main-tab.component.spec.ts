import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { IpApiService } from '@app/core/services/location/ip-api.service';
import { IpDataService } from '@app/core/services/location/ip-data.service';
import { IpServicesHolderService } from '@app/core/services/location/ip-services-holder.service';
import { IpnfDataService } from '@app/core/services/location/ipnf-data.service';
import { LocationService } from '@app/core/services/location/location.service';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LocationServiceMock, StorageManagerMock } from '../../../../testing/mocks';
import { SearchFiltersMainTabComponent } from './search-filters-main-tab.component';

describe('SearchFiltersMainTabComponent', () => {
    let component: SearchFiltersMainTabComponent;
    let fixture: ComponentFixture<SearchFiltersMainTabComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SearchFiltersMainTabComponent],
                imports: [RouterTestingModule, IonicModule.forRoot(), TranslateModule.forRoot(), HttpClientTestingModule],
                providers: [
                    SearchFilterStateService,
                    SelectableCountryOnSearchService,
                    SelectableCityOnSearchService,
                    IpServicesHolderService,
                    IpApiService,
                    IpDataService,
                    IpnfDataService,
                    { provide: LocationService, useClass: LocationServiceMock },
                    { provide: StorageManagerService, useClass: StorageManagerMock }
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(SearchFiltersMainTabComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
