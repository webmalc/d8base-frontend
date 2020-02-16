import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegistrationFormService} from '../../forms/registration-form.service';
import {RegistrationFormFields} from '../../enums/registration-form-fields';
import {User} from '@app/shared/models/user';
import {plainToClass} from 'class-transformer';
import {LocationModel} from '@app/core/models/location.model';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {

    @Output() private registrationFormData = new EventEmitter<{user: User, location: LocationModel}>();

    public errorMessage: string;
    public readonly formFields = RegistrationFormFields;

    constructor(private registrationFormService: RegistrationFormService) {
    }

    ngOnInit() {
        this.registrationFormService.initForm();
    }

    public submitRegistrationForm() {
        const formData: object = this.registrationFormService.form.getRawValue();

        const user = plainToClass(User, formData, { excludeExtraneousValues: true });
        const location = plainToClass(LocationModel, formData, { excludeExtraneousValues: true });

        this.registrationFormData.emit({user, location});
    }
}
