import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegistrationFormService} from '../../forms/registration-form.service';
import {RegistrationFormFields} from '../../enums/registration-form-fields';
import {User} from '@app/shared/models/user';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {

    @Output() private user = new EventEmitter<User>();

    public errorMessage: string;
    public readonly formFields = RegistrationFormFields;

    constructor(private registrationFormService: RegistrationFormService) {
    }

    ngOnInit() {
        this.registrationFormService.initForm();
    }

    public submitRegistrationForm() {
        const user = plainToClass(User, this.registrationFormService.form.getRawValue());

        this.user.emit(user);
    }

}
