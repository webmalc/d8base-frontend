import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ErrorFlashbagComponent } from '@app/shared/components/error-flashbag/error-flashbag.component';
import { TranslateService } from '@ngx-translate/core';
import { ComponentTestingModule, ROOT_MODULES } from 'src/testing/component-testing.module';
import { LoginFormFields } from '../../enums/login-form-fields';
import { Credentials } from '../../interfaces/credentials';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let router: Router;
  // Ionic Angular was already initialized. Make sure IonicModule is just called once.
  // But if remove 'forRoot()' - test submit login form don't pass. Magick!
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [LoginFormComponent, ErrorFlashbagComponent],
        imports: [...ROOT_MODULES, ComponentTestingModule],
        providers: [TranslateService],
      }).compileComponents();

      router = TestBed.inject(Router);
      spyOn(router, 'navigateByUrl');

      fixture = TestBed.createComponent(LoginFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it(
    'test submit login form',
    waitForAsync(() => {
      const username = component.form.controls[LoginFormFields.Username];
      const password = component.form.controls[LoginFormFields.Password];
      password.setValue('Q3Bds56jkADCC323dfsa');
      username.setValue('d8b@d8b.com');

      spyOn((component as any).user, 'emit');

      fixture.debugElement.nativeElement.querySelector('ion-button[type="submit"]').click();
      const newUser: Credentials = { username: 'd8b@d8b.com', password: 'Q3Bds56jkADCC323dfsa' };
      expect((component as any).user.emit).toHaveBeenCalledWith(newUser);
    }),
  );
});
