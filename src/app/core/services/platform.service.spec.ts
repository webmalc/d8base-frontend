import { HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from '@app/app.component';
import { AppModule } from '@app/app.module';
import { PlatformService } from '@app/core/services';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

// TODO check for availability on staging
xdescribe('PlatformService', () => {
  let statusBarSpy, splashScreenSpy;
  let storageMock: Partial<Storage>;
  let httpTestingController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
      splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);

      storageMock = {
        get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
        set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null)),
      };

      TestBed.configureTestingModule({
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [...RootModules(), ComponentTestingModule, AppModule],
        providers: [
          PlatformService,
          { provide: StatusBar, useValue: statusBarSpy },
          { provide: SplashScreen, useValue: splashScreenSpy },
          { provide: Storage, useValue: storageMock },
        ],
      });
      httpTestingController = TestBed.get(HttpTestingController);
    }),
  );

  it('should initialize the app', async () => {
    const app = TestBed.createComponent(AppComponent);
    expect(app).toBeDefined();
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });
});
