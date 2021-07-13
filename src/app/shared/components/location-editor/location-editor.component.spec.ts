import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { TimezoneService } from '@app/core/services/timezone.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { SelectableCountryOnSearchService } from '../../services/selectable-country-on-search.service';
import { SelectableDistrictOnSearchService } from '../../services/selectable-district-on-search.service';
import { SelectableRegionOnSearchService } from '../../services/selectable-region-on-search.service';
import { SelectableSubregionOnSearchService } from '../../services/selectable-subregion-on-search.service';
import { LocationEditorComponent } from './location-editor.component';

describe('AbstractLocationEditComponent', () => {
  let component: LocationEditorComponent;
  let fixture: ComponentFixture<LocationEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LocationEditorComponent],
        imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
        providers: [
          FormBuilder,
          TimezoneService,
          SelectableCountryOnSearchService,
          SelectableRegionOnSearchService,
          SelectableSubregionOnSearchService,
          SelectableDistrictOnSearchService,
          { provide: StorageManagerService, useClass: StorageManagerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(LocationEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
