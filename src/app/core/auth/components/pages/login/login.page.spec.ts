import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {ErrorFlashbagComponent} from '../../../shared/components/error-flashbag/error-flashbag.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TokenManagerService} from '../services/token-manager.service';
import {Router} from '@angular/router';
import {LoginFormService} from '../forms/login-form.service';
import {UserModel} from '../../shared/models/user.model';
import {Observable} from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage, LoginFormComponent, ErrorFlashbagComponent, ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: TokenManagerService, useClass: TokenManagerServiceMock },
          LoginFormService,
          FormBuilder
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test nested component exists', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-login-form')).not.toBe(null);
    expect(compiled.querySelector('app-login-form ion-input[name="username"]')).not.toBe(null);
    expect(compiled.querySelector('app-login-form ion-input[name="password"]')).not.toBe(null);
  });
  it('test valid auth data submit', fakeAsync(() => {

    const user = new UserModel();
    user.username = 'valid';
    user.password = 'valid';

    component.onSubmitLoginForm(user);
    flush();

    expect(router.navigateByUrl).toHaveBeenCalled();
  }));
  it('test invalid auth data submit', fakeAsync(() => {

    const user = new UserModel();
    user.username = 'invalid';
    user.password = 'invalid';

    component.onSubmitLoginForm(user);
    flush();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
  }));
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
