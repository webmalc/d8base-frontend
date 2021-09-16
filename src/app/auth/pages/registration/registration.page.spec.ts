import { HttpClient } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorFlashbagComponent } from '@app/shared/components/error-flashbag/error-flashbag.component';
import { IonicModule } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { of } from 'rxjs';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import { RegistrationService } from '../../services/registration.service';
import { RegistrationPage } from './registration.page';

describe('RegistrationPage', () => {
  let component: RegistrationPage;
  let fixture: ComponentFixture<RegistrationPage>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegistrationPage, RegistrationFormComponent, ErrorFlashbagComponent],
        imports: [
          IonicModule,
          ReactiveFormsModule,
          FormsModule,
          RouterTestingModule,
          TranslateModule.forRoot(),
          IonicSelectableModule,
          IonicStorageModule.forRoot(),
        ],
        providers: [FormBuilder, RegistrationService, { provide: HttpClient, useValue: { post: () => of(true) } }],
      }).compileComponents();

      router = TestBed.inject(Router);
      spyOn(router, 'navigateByUrl');

      fixture = TestBed.createComponent(RegistrationPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('test nested component exists', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-registration-form')).not.toBe(null, "Form shouldn't be null");
    expect(compiled.querySelector('app-registration-form ion-input[name="email"]')).not.toBe(
      null,
      "Email shouldn't be null",
    );
    expect(compiled.querySelector('app-registration-form ion-input[name="password"]')).not.toBe(
      null,
      "Password shouldn't be null",
    );
    expect(compiled.querySelector('app-registration-form ion-input[name="confirm"]')).not.toBe(
      null,
      "Confirm shouldn't be null",
    );
    expect(compiled.querySelector('app-registration-form ion-input[name="name"]')).not.toBe(
      null,
      "Name shouldn't be null",
    );
    expect(compiled.querySelector('app-registration-form ion-input[name="phone"]')).not.toBe(
      null,
      "Phone shouldn't be null",
    );
    // expect(compiled.querySelector('app-registration-form ion-input[name="country"]')).not.toBe(null, 'Country shouldn\'t be null');
    // expect(compiled.querySelector('app-registration-form ion-input[name="city"]')).not.toBe(null, 'City shouldn\'t be null');
  });

  xit('test submit form', fakeAsync(() => {
    const user = {
      email: 'test@test.te',
      password: 'test',
      password_confirm: 'test',
      firstName: 'test',
    };
    const location = {
      country: 1,
      city: 1,
    };

    component.onSubmitRegistrationForm({
      user,
      location,
    });
    flush();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/profile');
  }));
});

// ** TODO: Need to title test
