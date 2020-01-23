import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginFormService} from '../../forms/login-form.service';
import {LoginFormFields} from '../../enums/login-form-fields';
import {Router} from '@angular/router';
import {Credentials} from '@app/auth/interfaces/credentials';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    @Input() private errorMessage: string;
    @Output() private user = new EventEmitter<Credentials>();

    private readonly formFields = LoginFormFields;

    constructor(
        private loginFormService: LoginFormService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.loginFormService.initForm();
    }

    public submitLoginForm() {
        const data = this.loginFormService.form.getRawValue();
        const credentials = {
            username: data[LoginFormFields.Username],
            password: data[LoginFormFields.Password]
        };
        this.user.emit(credentials);
    }

    public onForgotPassword() {
        this.router.navigateByUrl('/auth/password-recover');
    }
}
