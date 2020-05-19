import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LocationTabComponent} from './location-tab.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LocationComponent} from '../../../shared/components/location/location.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('LocationTabComponent', () => {
    let component: LocationTabComponent;
    let fixture: ComponentFixture<LocationTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LocationTabComponent, LocationComponent],
            imports: [IonicModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(LocationTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
