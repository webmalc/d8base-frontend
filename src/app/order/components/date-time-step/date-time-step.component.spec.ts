import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {OrderService} from '@app/order/services/order.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {DateTimeStepComponent} from './date-time-step.component';

describe('ServiceOrderStepOneComponent', () => {
    let component: DateTimeStepComponent;
    let fixture: ComponentFixture<DateTimeStepComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DateTimeStepComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
            providers: [OrderService]
        }).compileComponents();

        fixture = TestBed.createComponent(DateTimeStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
