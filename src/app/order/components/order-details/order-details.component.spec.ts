import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {OrderService} from '@app/order/services/order.service';
import {IonicModule} from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import {OrderDetailsComponent} from './order-details.component';

describe('OrderDetailsComponent', () => {
    let component: OrderDetailsComponent;
    let fixture: ComponentFixture<OrderDetailsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OrderDetailsComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
            providers: [OrderService]
        }).compileComponents();

        fixture = TestBed.createComponent(OrderDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
