import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';
import {ApiListResponseInterface} from '../../../core/interfaces/api-list-response.interface';
import {LocationService} from '../../../core/services/location/location.service';
import {City} from '../../../profile/models/city';
import {CitiesApiService} from '../../../profile/services/cities-api.service';
import {CityPickerPopoverComponent} from './city-picker-popover.component';

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
            results: []
        };

        return of(response);
    }
}

describe('CityPickerPopoverComponent', () => {
    let component: CityPickerPopoverComponent;
    let fixture: ComponentFixture<CityPickerPopoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CityPickerPopoverComponent],
            imports: [IonicModule, HttpClientTestingModule],
            providers: [
                {
                    provide: LocationService,
                    useClass: LocationServiceStub
                },
                {
                    provide: CitiesApiService,
                    useClass: CitiesApiServiceStub
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CityPickerPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
