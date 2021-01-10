import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { CitiesApiService } from '@app/core/services/location/cities-api.service';
import { LocationService } from '@app/core/services/location/location.service';
import { City } from '@app/profile/models/city';
import { IonicModule, NavParams } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { CityPickerPopoverComponent } from './city-picker-popover.component';

class LocationServiceStub {
  public getMergedLocationData(): Promise<null> {
    return new Promise(resolve => resolve(null));
  }
}

// tslint:disable-next-line:max-classes-per-file
class CitiesApiServiceStub {
  public getByLocation(): Observable<ApiListResponseInterface<City>> {
    const response: ApiListResponseInterface<City> = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    return of(response);
  }
}

describe('CityPickerPopoverComponent', () => {
  let component: CityPickerPopoverComponent;
  let fixture: ComponentFixture<CityPickerPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CityPickerPopoverComponent],
      imports: [IonicModule, HttpClientTestingModule],
      providers: [
        {
          provide: LocationService,
          useClass: LocationServiceStub,
        },
        {
          provide: CitiesApiService,
          useClass: CitiesApiServiceStub,
        },
        { provide: NavParams, useValue: { get: () => null } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CityPickerPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
