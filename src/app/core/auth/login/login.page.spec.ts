import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {ErrorFlashbagComponent} from '../../../shared/components/error-flashbag/error-flashbag.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TokenManagerService} from '../services/token-manager.service';
import {TokenManagerServiceMock} from '../components/login-form/login-form.component.spec';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage, LoginFormComponent, ErrorFlashbagComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: TokenManagerService, useClass: TokenManagerServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-login-form')).not.toBe(null);
  });
});
