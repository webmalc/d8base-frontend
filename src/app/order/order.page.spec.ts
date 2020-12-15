import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';
import {IonicModule} from '@ionic/angular';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateModule} from '@ngx-translate/core';

import {OrderPage} from './order.page';

describe('OrderPage', () => {
    let component: OrderPage;
    let fixture: ComponentFixture<OrderPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OrderPage],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                OrderWizardStateService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(OrderPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
