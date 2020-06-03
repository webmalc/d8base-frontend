import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SelectableCityOnSearchService} from '../../services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '../../services/selectable-country-on-search.service';
import {SelectableDistrictOnSearchService} from '../../services/selectable-district-on-search.service';
import {SelectableRegionOnSearchService} from '../../services/selectable-region-on-search.service';
import {SelectableSubregionOnSearchService} from '../../services/selectable-subregion-on-search.service';
import { LocationItemComponent } from './location-item.component';

describe('LocationItemComponent', () => {
  let component: LocationItemComponent;
  let fixture: ComponentFixture<LocationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationItemComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        SelectableCountryOnSearchService,
        SelectableCityOnSearchService,
        SelectableRegionOnSearchService,
        SelectableSubregionOnSearchService,
        SelectableDistrictOnSearchService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationItemComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
