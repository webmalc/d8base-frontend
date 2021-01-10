import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExtendedLocation } from '@app/core/models/extended-location';
import { Country } from '@app/profile/models/country';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { IonicModule, NavParams, PopoverController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { plainToClass } from 'class-transformer';
import { DefaultLocationPopoverComponent } from './default-location-popover.component';

describe('DefaultLocationPopoverComponent', () => {
  let component: DefaultLocationPopoverComponent;
  let fixture: ComponentFixture<DefaultLocationPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultLocationPopoverComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        SelectableCountryOnSearchService,
        SelectableCityOnSearchService,
        { provide: PopoverController, useValue: { dismiss: () => Promise.resolve() } },
        {
          provide: NavParams, useValue: {
            get: () => {
              const country = new Country();
              country.name = 'test';

              return plainToClass(ExtendedLocation, { country });
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultLocationPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
