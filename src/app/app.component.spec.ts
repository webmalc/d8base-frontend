import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform} from '@ionic/angular';
import {IonicStorageModule, Storage} from '@ionic/storage';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {AppComponent} from './app.component';
import {StorageManagerService} from './core/proxies/storage-manager.service';
import {DarkModeService} from './core/services/dark-mode.service';
import {TranslationService} from './core/services/translation.service';

describe('AppComponent', () => {

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
    let storageMock: Partial<Storage>;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});

        storageMock = {
            get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
            set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null))
        };

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [RouterTestingModule, IonicStorageModule.forRoot(), TranslateModule.forRoot(), HttpClientTestingModule],
            providers: [
                {provide: StatusBar, useValue: statusBarSpy},
                {provide: SplashScreen, useValue: splashScreenSpy},
                {provide: Platform, useValue: platformSpy},
                {provide: Storage, useValue: storageMock},
                DarkModeService,
                StorageManagerService,
                TranslationService
            ]
        }).compileComponents().then();

        fixture = TestBed.createComponent(AppComponent);
    }));

    it('should create the app', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
        expect(statusBarSpy.styleDefault).toHaveBeenCalled();
        expect(splashScreenSpy.hide).toHaveBeenCalled();
    });

    it('should be light mode by default', () => {
        const compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
        expect(compiled.querySelector('ion-app').getAttribute('class'))
            .not.toContain('dark-theme');
    });

    it('should toggle dark mode', () => {
        const compiled = fixture.debugElement.nativeElement;
        fixture.componentInstance.changeMode({target: {checked: true}});
        fixture.detectChanges();
        expect(compiled.querySelector('ion-app').getAttribute('class'))
            .toContain('dark-theme');
    });

    it('test translation select options', () => {
        const trans: TranslationService = TestBed.inject(TranslationService);
        const compiled = fixture.debugElement.nativeElement;
        compiled.querySelectorAll('ion-select ion-select-option').forEach(
            (elem: Element) => {
                expect(trans.getLanguagesAsArray()).toContain(elem.innerHTML.trim());
            }
        );
    });

    // TODO: How have I test header to ?
    xit('should have title in  header', () => {
    });

    // TODO: add more tests!

});
