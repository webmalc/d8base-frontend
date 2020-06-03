import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {LocationListComponent} from '../../../shared/components/location/location-list.component';
import {LocationTabComponent} from './location-tab.component';

describe('LocationTabComponent', () => {
    let component: LocationTabComponent;
    let fixture: ComponentFixture<LocationTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LocationTabComponent, LocationListComponent],
            imports: [IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LocationTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
