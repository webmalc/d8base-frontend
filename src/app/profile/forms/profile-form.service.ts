import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@app/core/models/user';
import {AppValidators} from '@app/core/validators/app.validators';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {Language} from '@app/profile/models/language';

@Injectable({
        providedIn: 'root',
    }
)
// ** TODO: To find out right way about validation data from API
export class ProfileFormService {

    private mainLanguages: Language[];
    private additionalLanguages: Language[];

    constructor(private formBuilder: FormBuilder) {
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
                // password: [
                //     user.password,
                //     [
                //         Validators.required,
                //         Validators.minLength(4),
                //         Validators.maxLength(30),
                //     ]
                // ],
                [ProfileFormFields.Email]: [
                    user.email,
                    [
                        Validators.required,
                        Validators.email,
                    ]
                ],
                [ProfileFormFields.Phone]: [
                    user.phone,
                    [
                        Validators.required,
                    ]
                ],
                [ProfileFormFields.Avatar]: [
                    user.avatar,
                    [
                        Validators.maxLength(512)
                    ]
                ],
                [ProfileFormFields.Gender]: [
                    user.gender?.toString(),
                    [Validators.required]
                ],
                [ProfileFormFields.Birthday]: [
                    user.birthday,
                    [
                        Validators.required,
                    ]
                ],
                [ProfileFormFields.Language]: [
                    user.main_language,
                    [
                        // Validators.required,
                        AppValidators.restrictEnum(this.mainLanguages?.map(lang => lang.code))
                    ]
                ],
                [ProfileFormFields.AdditionalLanguages]: [
                    user.languages,
                    [
                        AppValidators.restrictEnumArray(this.additionalLanguages?.map(lang => lang.code))
                    ]
                ]
            }
        );
    }

    public setValidators(languages: Language[], addsLanguages: Language[]): void {
        this.mainLanguages = languages;
        this.additionalLanguages = addsLanguages;
    }
}
