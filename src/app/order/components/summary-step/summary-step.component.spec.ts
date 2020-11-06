import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {OrderService} from '@app/order/services/order.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {SummaryStepComponent} from './summary-step.component';

describe('SummaryStepComponent', () => {
    let component: SummaryStepComponent;
    let fixture: ComponentFixture<SummaryStepComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SummaryStepComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
            providers: [OrderService]
        }).compileComponents();

        fixture = TestBed.createComponent(SummaryStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
