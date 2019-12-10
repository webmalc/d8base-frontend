import { Component, OnInit } from '@angular/core';
import {TokenManagerService} from '../../services/token-manager.service';
import {LoginFormService} from '../../forms/login-form.service';
import {UserModel} from '../../../shared/models/user.model';
import {LoginFormFields} from '../../enums/login-form-fields';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  private readonly FieldNames = LoginFormFields;

  private errorMessage: string;

  constructor(
      private tokenManager: TokenManagerService,
      private loginForm: LoginFormService,
      private router: Router
  ) {
  }

  ngOnInit() {}

  public submitLoginForm() {
    const user: UserModel = UserModel.createFromForm(this.loginForm.form.getRawValue());
    console.log(this.loginForm.form.getRawValue());
    console.log(user);
    this.tokenManager.doAuth(user).subscribe(
        (result: boolean) => {
          if (result) {
            console.log('successfully authenticated');
            this.router.navigateByUrl('/home');
          }
        },
        error => {
            this.errorMessage = 'incorrect login or password';
            console.log(error);
        }
    );
  }
}
