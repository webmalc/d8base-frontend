import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';
import {IonicModule} from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import {OrderDetailsComponent} from './order-details.component';

describe('OrderDetailsComponent', () => {
    let component: OrderDetailsComponent;
    let fixture: ComponentFixture<OrderDetailsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OrderDetailsComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule],
            providers: [OrderWizardStateService]
        }).compileComponents();

        fixture = TestBed.createComponent(OrderDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
