import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {OrderConfirmationComponent} from './order-confirmation.component';

describe('OrderConfirmationComponent', () => {
    let component: OrderConfirmationComponent;
    let fixture: ComponentFixture<OrderConfirmationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OrderConfirmationComponent],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
