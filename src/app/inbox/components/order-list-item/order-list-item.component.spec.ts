import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {OrderListItemComponent} from '@app/inbox/components';
import { ServicesApiCache } from '@app/inbox/services';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

describe('OrderListItemComponent', () => {
    let component: OrderListItemComponent;
    let fixture: ComponentFixture<OrderListItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OrderListItemComponent],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [ServicesApiCache]
        }).compileComponents();

        fixture = TestBed.createComponent(OrderListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
