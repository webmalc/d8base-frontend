import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(waitForAsync(() => {
        const storageMock: Partial<Storage> = {
            get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
            set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null)),
        };
        TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: Storage, useValue: storageMock},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
