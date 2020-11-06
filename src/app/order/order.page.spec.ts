import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule} from '@ionic/angular';
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
                RouterTestingModule,
                HttpClientTestingModule
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
