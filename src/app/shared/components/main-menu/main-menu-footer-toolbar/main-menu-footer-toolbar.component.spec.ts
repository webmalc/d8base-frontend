import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule} from '@ngx-translate/core';

import {MainMenuFooterToolbarComponent} from './main-menu-footer-toolbar.component';

describe('MainMenuFooterComponent', () => {
    let component: MainMenuFooterToolbarComponent;
    let fixture: ComponentFixture<MainMenuFooterToolbarComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MainMenuFooterToolbarComponent],
            imports: [
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot(),
                HttpClientTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MainMenuFooterToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
