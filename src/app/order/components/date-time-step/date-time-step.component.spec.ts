import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {DateTimeStepComponent} from './date-time-step.component';

describe('ServiceOrderStepOneComponent', () => {
    let component: DateTimeStepComponent;
    let fixture: ComponentFixture<DateTimeStepComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [DateTimeStepComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule],
            providers: [OrderWizardStateService]
        }).compileComponents();

        fixture = TestBed.createComponent(DateTimeStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
