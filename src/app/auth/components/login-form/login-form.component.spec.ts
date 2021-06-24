import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
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
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [LoginFormComponent, ErrorFlashbagComponent, FormControlErrorComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [TranslateService],
      }).compileComponents();

      fixture = TestBed.createComponent(LoginFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBeFalsy();
  });

  it('test submit login form', fakeAsync(() => {
    const user: Credentials = {
      [LoginFormFields.Username]: 'd8b@d8b.com',
      [LoginFormFields.Password]: 'Q3Bds56jkADCC323dfsa',
    };
    component.form.setValue(user);
    fixture.detectChanges();

    spyOn(component.user, 'emit');

    const submitButton: HTMLIonButtonElement = fixture.debugElement.nativeElement.querySelector('[type="submit"]');
    expect(submitButton).toBeTruthy();
    submitButton.click();
    fixture.detectChanges();
    flush();
    expect(component.user.emit).toHaveBeenCalledWith(user);
  }));
});
