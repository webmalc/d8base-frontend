import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RegistrationPageModule } from '@app/auth/pages/registration/registration.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { RegistrationFormFields } from './registration-form-fields';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [...RootModules(), ComponentTestingModule, RegistrationPageModule],
      }).compileComponents();

      router = TestBed.inject(Router);
      spyOn(router, 'navigateByUrl');

      fixture = TestBed.createComponent(RegistrationFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('test submit registration form', () => {
    const email = (component as any).registrationFormService.form.controls[RegistrationFormFields.Email];
    const pwd = (component as any).registrationFormService.form.controls[RegistrationFormFields.Password];

    email.setValue('test@test.te');
    pwd.setValue('test');

    spyOn((component as any).registrationFormData, 'emit');

    fixture.debugElement.nativeElement.querySelector('ion-button').click();

    const testUser = {
      email: 'test@test.te',
      password: 'test',
      firstName: '',
      phone: '',
    };

    const testLocation = {
      city: '',
      country: '',
    };

    expect((component as any).registrationFormData.emit).toHaveBeenCalledWith({
      user: testUser,
      location: testLocation,
    });
  });
});
