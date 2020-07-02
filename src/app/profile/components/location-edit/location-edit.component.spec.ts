import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {Location} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {LocationService} from '../../../core/services/location.service';
import {UserLocationApiService} from '../../../core/services/location/user-location-api.service';
import {TimezoneService} from '../../../core/services/timezone.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {SelectableCityOnSearchService} from '../../../shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '../../../shared/services/selectable-country-on-search.service';
import {SelectableDistrictOnSearchService} from '../../../shared/services/selectable-district-on-search.service';
import {SelectableRegionOnSearchService} from '../../../shared/services/selectable-region-on-search.service';
import {SelectableSubregionOnSearchService} from '../../../shared/services/selectable-subregion-on-search.service';
import { LocationEditComponent } from './location-edit.component';

describe('LocationEditComponent', () => {
    let component: LocationEditComponent;
    let fixture: ComponentFixture<LocationEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LocationEditComponent ],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get(): string { return ''; }}}}},
                UserLocationApiService,
                SelectableCountryOnSearchService,
                SelectableCityOnSearchService,
                SelectableRegionOnSearchService,
                SelectableSubregionOnSearchService,
                SelectableDistrictOnSearchService,
                LocationService,
                TimezoneService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
                Location
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LocationEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
