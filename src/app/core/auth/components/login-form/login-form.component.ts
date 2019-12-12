import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginFormService} from '../../forms/login-form.service';
import {UserModel} from '../../../shared/models/user.model';
import {LoginFormFields} from '../../enums/login-form-fields';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  @Input() private errorMessage: string;
  @Output() private submit = new EventEmitter<UserModel>();

  private readonly FieldNames = LoginFormFields;

  constructor(
      private loginForm: LoginFormService
  ) {
  }

  ngOnInit() {
      this.loginForm.initForm();
  }

  public submitLoginForm() {
    const user: UserModel = UserModel.createFromForm(this.loginForm.form.getRawValue());

    this.submit.emit(user);
  }
}
