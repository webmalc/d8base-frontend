import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@app/core/models/user';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {Language} from '@app/profile/models/language';

@Injectable({
        providedIn: 'root'
    }
)
// ** TODO: To find out right way about validation data from API
export class ProfileFormService {

    constructor(private readonly formBuilder: FormBuilder) {
    }

    public createForm(user: User): FormGroup {
        return this.formBuilder.group({
                [ProfileFormFields.FirstName]: [
                    user.first_name, [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                [ProfileFormFields.LastName]: [
                    user.last_name,
                    [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                [ProfileFormFields.Patronymic]: [
                    user.patronymic,
                    [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                [ProfileFormFields.Email]: [
                    user.email,
                    [
                        Validators.required,
                        Validators.email
                    ]
                ],
                [ProfileFormFields.Gender]: [
                    user.gender?.toString(),
                    [Validators.required]
                ]
            }
        );
    }

    public setValidators(languages: Language[], addsLanguages: Language[]): void {
        // this.mainLanguages = languages.map(lang => lang.code);
        // this.additionalLanguages = addsLanguages.map(lang => lang.code);
    }
}
