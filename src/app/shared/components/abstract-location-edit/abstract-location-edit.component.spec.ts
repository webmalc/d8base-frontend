import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {TimezoneService} from '../../../core/services/timezone.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {SelectableCityOnSearchService} from '../../services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '../../services/selectable-country-on-search.service';
import {SelectableDistrictOnSearchService} from '../../services/selectable-district-on-search.service';
import {SelectableRegionOnSearchService} from '../../services/selectable-region-on-search.service';
import {SelectableSubregionOnSearchService} from '../../services/selectable-subregion-on-search.service';
import {AbstractLocationEditComponent} from './abstract-location-edit.component';

describe('AbstractLocationEditComponent', () => {
    let component: AbstractLocationEditComponent;
    let fixture: ComponentFixture<AbstractLocationEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AbstractLocationEditComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [
                TimezoneService,
                SelectableCountryOnSearchService,
                SelectableCityOnSearchService,
                SelectableRegionOnSearchService,
                SelectableSubregionOnSearchService,
                SelectableDistrictOnSearchService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AbstractLocationEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
