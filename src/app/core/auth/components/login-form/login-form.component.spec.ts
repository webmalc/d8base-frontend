import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginFormComponent } from './login-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorFlashbagComponent} from '../../../../shared/components/error-flashbag/error-flashbag.component';
import {TokenManagerService} from '../../services/token-manager.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../../shared/models/user.model';
import {Router} from '@angular/router';
import {LoginFormFields} from '../../enums/login-form-fields';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent, ErrorFlashbagComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule]
    }).compileComponents();

    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect((component as any).loginFormService.form.valid).toBeFalsy();
  });

  it('test correct auth data', () => {
    const username = (component as any).loginFormService.form.controls[LoginFormFields.Username];
    const password = (component as any).loginFormService.form.controls[LoginFormFields.Password];
    password.setValue('valid');
    username.setValue('valid');

    spyOn((component as any).user, 'emit');

    fixture.debugElement.nativeElement.querySelector('ion-button').click();

    const newUser = new UserModel();
    newUser.password = 'valid';
    newUser.username = 'valid';

    expect((component as any).user.emit).toHaveBeenCalledWith(newUser);
  });
});

