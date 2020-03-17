import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocationModel} from '@app/core/models/location.model';
import {User} from '@app/core/models/user';
import {plainToClass} from 'class-transformer';
import {RegistrationFormFields} from '../../enums/registration-form-fields';
import {RegistrationFormService} from '../../forms/registration-form.service';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {

    public errorMessage: string;
    public readonly formFields = RegistrationFormFields;

    @Output() private readonly registrationFormData = new EventEmitter<{user: User, location: LocationModel}>();

    constructor(public readonly registrationFormService: RegistrationFormService) {
    }

    public ngOnInit(): void {
        this.registrationFormService.initForm();
    }

    public submitRegistrationForm(): void {
        const formData: object = this.registrationFormService.form.getRawValue();

        const user = plainToClass(User, formData, { excludeExtraneousValues: true });
        const location = plainToClass(LocationModel, formData, { excludeExtraneousValues: true });

        this.registrationFormData.emit({user, location});
    }
}
