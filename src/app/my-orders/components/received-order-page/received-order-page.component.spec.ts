import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {ReceivedOrderPageComponent} from './received-order-page.component';

describe('ReceivedOrderPageComponent', () => {
    let component: ReceivedOrderPageComponent;
    let fixture: ComponentFixture<ReceivedOrderPageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ReceivedOrderPageComponent],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ReceivedOrderPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
