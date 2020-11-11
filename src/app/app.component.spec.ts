import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IpApiService} from '@app/core/services/location/ip-api.service';
import {IpDataService} from '@app/core/services/location/ip-data.service';
import {IpServicesHolderService} from '@app/core/services/location/ip-services-holder.service';
import {IpnfDataService} from '@app/core/services/location/ipnf-data.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform, PopoverController} from '@ionic/angular';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateModule} from '@ngx-translate/core';
import {AppComponent} from './app.component';
import {StorageManagerService} from './core/proxies/storage-manager.service';
import {DarkModeService} from './core/services/dark-mode.service';
import {TranslationService} from './core/services/translation.service';

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
                TranslationService,
                IpServicesHolderService,
                IpApiService,
                IpDataService,
                IpnfDataService,
                {provide: Geolocation, useValue: {getCurrentPosition: () => 'test'}},
                {provide: LocationAccuracy, useValue: {canRequest: () => true, REQUEST_PRIORITY_HIGH_ACCURACY: 'test'}},
                {provide: PopoverController, useValue: {create: () => Promise.resolve()}}
            ]
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

    // TODO: add more tests!

});
