import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {DarkModeService, TranslationService} from '@app/core/services';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform} from '@ionic/angular';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateModule} from '@ngx-translate/core';
import {AppComponent} from './app.component';
import {StorageManagerService} from './core/proxies/storage-manager.service';

describe('AppComponent', () => {

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
    let storageMock: Partial<Storage>;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy, is: () => true});

        storageMock = {
            get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
            set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null)),
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
                TranslationService,
            ],
        });

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

    it('test translation select options', () => {
        const trans: TranslationService = TestBed.inject(TranslationService);
        const compiled = fixture.debugElement.nativeElement;
        compiled.querySelectorAll('ion-select ion-select-option').forEach(
            (elem: Element) => {
                expect(trans.getLanguagesAsArray()).toContain(elem.innerHTML.trim());
            },
        );
    });

    // TODO: add more tests!

});
