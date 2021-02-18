import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ErrorFlashbagComponent } from '@app/shared/components/error-flashbag/error-flashbag.component';
import { FormControlErrorComponent } from '@app/shared/components/form-control-error/form-control-error.component';
import { TranslateService } from '@ngx-translate/core';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
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
        declarations: [LoginFormComponent, ErrorFlashbagComponent, FormControlErrorComponent],
        imports: [...RootModules(), ComponentTestingModule],
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

  it('test submit login form', () => {
    const user: Credentials = {
      [LoginFormFields.Username]: 'd8b@d8b.com',
      [LoginFormFields.Password]: 'Q3Bds56jkADCC323dfsa',
    };
    component.form.setValue(user);

    spyOn(component.user, 'emit');

    fixture.debugElement.nativeElement.querySelector('[type="submit"]').click();
    fixture.detectChanges();
    expect(component.user.emit).toHaveBeenCalledWith(user);
  });
});
