import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '@app/core/models/user';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {ProfileService} from '@app/profile/services/profile.service';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {

    public form: FormGroup;
    public formFields = ProfileFormFields;

    constructor(
        private profileService: ProfileService,
        private location: Location
    ) {
    }

    public ngOnInit(): void {
        this.profileService.createProfileForm$().subscribe(
            form => this.form = form
        );
    }

    public submitForm(): void {
        this.profileService.updateUser(
            plainToClass(User, this.form.getRawValue(), {excludeExtraneousValues: true})
        );
        this.location.back();
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid);
    }
}
