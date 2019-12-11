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
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: TokenManagerService, useClass: TokenManagerServiceMock },
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect((component as any).loginForm.form.valid).toBeFalsy();
  });

  it('test wrong auth data', () => {
    const username = (component as any).loginForm.form.controls[LoginFormFields.Username];
    const password = (component as any).loginForm.form.controls[LoginFormFields.Password];
    password.setValue('invalid');
    username.setValue('invalid');
    expect((component as any).loginForm.form.valid).toBeTruthy();

    fixture.debugElement.nativeElement.querySelector('ion-button').click();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
  it('test correct auth data', () => {
    const username = (component as any).loginForm.form.controls[LoginFormFields.Username];
    const password = (component as any).loginForm.form.controls[LoginFormFields.Password];
    password.setValue('valid');
    username.setValue('valid');

    fixture.debugElement.nativeElement.querySelector('ion-button').click();

    expect(router.navigateByUrl).toHaveBeenCalled();
  });
});

export class TokenManagerServiceMock {

  public doAuth(user: UserModel): Observable<boolean> {
    return new Observable<boolean>(
        subscriber => {
          if ('valid' === user.password && ('valid' === user.username)) {
            subscriber.next(true);
          } else {
            subscriber.next(false);
          }
          subscriber.complete();
        }
    );
  }
}
