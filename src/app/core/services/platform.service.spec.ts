import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from '@app/app.component';
import { AppModule } from '@app/app.module';
import { PlatformService, TranslationService } from '@app/core/services';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

describe('PlatformService', () => {

  let statusBarSpy, splashScreenSpy;
  let storageMock: Partial<Storage>;

  beforeEach(waitForAsync(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);

    storageMock = {
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null)),
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
        AppModule,
      ],
      providers: [
        PlatformService,
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Storage, useValue: storageMock },
      ],
    });
  }));

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    // expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    // expect(splashScreenSpy.hide).toHaveBeenCalled();
  });
});
