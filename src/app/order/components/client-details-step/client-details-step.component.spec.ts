import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {ClientDetailsStepComponent} from './client-details-step.component';

describe('ClientDetailsStepComponent', () => {
    let component: ClientDetailsStepComponent;
    let fixture: ComponentFixture<ClientDetailsStepComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ClientDetailsStepComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule],
            providers: [OrderWizardStateService]
        }).compileComponents();

        fixture = TestBed.createComponent(ClientDetailsStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
