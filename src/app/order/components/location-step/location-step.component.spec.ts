import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {LocationStepComponent} from './location-step.component';

describe('LocationStepComponent', () => {
    let component: LocationStepComponent;
    let fixture: ComponentFixture<LocationStepComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LocationStepComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
            providers: [OrderWizardStateService],
        }).compileComponents();

        fixture = TestBed.createComponent(LocationStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
