import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule} from '@ngx-translate/core';

import {MainMenuComponent} from './main-menu.component';

describe('MainMenuComponent', () => {
    let component: MainMenuComponent;
    let fixture: ComponentFixture<MainMenuComponent>;

    beforeEach(waitForAsync(() => {
        const storageMock: Partial<Storage> = {
            get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
            set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null)),
        };
        TestBed.configureTestingModule({
            declarations: [MainMenuComponent],
            imports: [
                RouterTestingModule,
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot(),
                HttpClientTestingModule,
            ],
            providers: [
                {provide: Storage, useValue: storageMock},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MainMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
