import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@app/core/models/user';
import {AppValidators} from '@app/core/validators/app.validators';

@Injectable({
        providedIn: 'root',
    }
)
// ** TODO: To find out right way about validation data from API
export class ProfileFormService {

    private mainLanguages: string[];
    private additionalLanguages: string[];
    private gendersValidatorData: string[];

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(user: User): FormGroup {
        return this.formBuilder.group({
                first_name: [
                    user.first_name, [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                last_name: [
                    user.last_name,
                    [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                patronymic: [
                    user.patronymic,
                    [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                password: [
                    user.password,
                    [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(30),
                    ]
                ],
                email: [
                    user.email,
                    [
                        Validators.required,
                        Validators.email,
                    ]
                ],
                phone: [
                    user.phone,
                    [
                        Validators.required,
                    ]
                ],
                avatar: [
                    user.avatar,
                    [
                        Validators.maxLength(512)
                    ]
                ],
                gender: [
                    user.gender,
                    [
                        AppValidators.restrictEnum(this.gendersValidatorData)
                    ]
                ],
                year: [
                    user.age,
                    [
                        Validators.required,
                    ]
                ],
                main_language: [
                    user.main_language,
                    [
                        Validators.required,
                        AppValidators.restrictEnum(this.mainLanguages)
                    ]
                ],
                languages: [
                    user.languages,
                    [
                        AppValidators.restrictEnumArray(this.additionalLanguages)
                    ]
                ]
            }
        );
    }

    public setValidators(languages: string[], addsLanguages: string[], genders: string[]): void {
        this.mainLanguages = languages;
        this.additionalLanguages = addsLanguages;
        this.gendersValidatorData = genders;
    }
}
