import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LocationViewerComponent} from './location-viewer.component';

describe('LocationPresentationComponent', () => {
    let component: LocationViewerComponent;
    let fixture: ComponentFixture<LocationViewerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LocationViewerComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(LocationViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
