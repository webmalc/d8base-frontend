import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '@app/core/models/user';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {Language} from '@app/profile/models/language';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-about-edit',
    templateUrl: './about-edit.component.html',
    styleUrls: ['./about-edit.component.scss'],
})
export class AboutEditComponent implements OnInit {

    public languages$: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>([]);
    public form: FormGroup;
    public formFields = ProfileFormFields;

    constructor(
        private readonly userManager: UserManagerService,
        public countriesApi: SelectableCountryOnSearchService,
        public languagesApi: LanguagesApiService,
        private readonly formBuilder: FormBuilder
    ) { }

    public ngOnInit(): void {

        this.userManager.getCurrentUser().subscribe(
            user => this.form = this.formBuilder.group({
                [this.formFields.Birthday]: [user.birthday],
                [this.formFields.Nationality]: [user.nationality],
                [this.formFields.Languages]: [user.languages]
            })
        );
        this.languagesApi.getLanguages$().subscribe(
            langs => this.languages$.next(langs)
        );
    }

    public submitForm(): void {
        this.userManager.updateUser(plainToClass(User, this.form.getRawValue())).subscribe(
            user => console.log('updated')
        );
    }
}
