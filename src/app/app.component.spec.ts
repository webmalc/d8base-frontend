import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslationService } from '@app/core/services';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ComponentTestingModule, ROOT_MODULES } from 'src/testing/component-testing.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy;
  let storageMock: Partial<Storage>;
  let fixture: ComponentFixture<AppComponent>;

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
          ...ROOT_MODULES,
          ComponentTestingModule,
      ],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Storage, useValue: storageMock },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
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
        expect(['ru', 'en']).toContain(elem.innerHTML.trim());
      },
    );
  });

  // TODO: add more tests!

});
