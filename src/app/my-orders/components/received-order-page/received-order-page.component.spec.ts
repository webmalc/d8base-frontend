import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ReceivedOrderPageComponent} from './received-order-page.component';

describe('ReceivedOrderPageComponent', () => {
    let component: ReceivedOrderPageComponent;
    let fixture: ComponentFixture<ReceivedOrderPageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ReceivedOrderPageComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ReceivedOrderPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
