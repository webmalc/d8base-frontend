import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginPageModule } from '@app/auth/pages/login/login.module';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ApiClientServiceMock } from 'src/testing/mocks';
import { Credentials } from '@app/core/interfaces/credentials';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [...RootModules(), ComponentTestingModule, LoginPageModule],
        providers: [{ provide: ApiClientService, useClass: ApiClientServiceMock }],
      }).compileComponents();

      router = TestBed.inject<Router>(Router);
      spyOn(router, 'navigateByUrl');

      fixture = TestBed.createComponent(LoginPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test nested component exists', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-login-form')).not.toBe(null);
    expect(compiled.querySelector('app-login-form ion-input[name="email"]')).not.toBe(null);
    expect(compiled.querySelector('app-login-form ion-input[name="password"]')).not.toBe(null);
  });

  it('test invalid auth data submit', fakeAsync(() => {
    const user: Credentials = { username: 'invalid', password: 'invalid' };

    component.onSubmitLoginForm(user);
    flush();

    // expect(component.errorMessages).toContain('login-page.incorrect-login-data');
    // TODO check error message
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  }));
});
