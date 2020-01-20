import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginFormService} from '../../forms/login-form.service';
import {LoginFormFields} from '../../enums/login-form-fields';
import {User} from '@app/shared/models/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    @Input() private errorMessage: string;
    @Output() private user = new EventEmitter<User>();

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
        const user: User = User.createFromLoginForm(this.loginFormService.form.getRawValue());

        this.user.emit(user);
    }

    public onForgotPassword() {
        this.router.navigateByUrl('/auth/password-recover');
    }
}
