import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {InboxPageComponent} from './inbox-page.component';

describe('InboxPageComponent', () => {
    let component: InboxPageComponent;
    let fixture: ComponentFixture<InboxPageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InboxPageComponent],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(InboxPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
