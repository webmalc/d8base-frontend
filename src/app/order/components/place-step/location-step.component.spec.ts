import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {OrderService} from '@app/order/services/order.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {LocationStepComponent} from './location-step.component';

describe('ServiceOrderStepTwoComponent', () => {
    let component: LocationStepComponent;
    let fixture: ComponentFixture<LocationStepComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LocationStepComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
            providers: [OrderService]
        }).compileComponents();

        fixture = TestBed.createComponent(LocationStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
