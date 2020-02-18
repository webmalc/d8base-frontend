import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {TranslationService} from '@app/core/services/translation.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {AppValidators} from '@app/core/validators/app.validators';
import {User} from '@app/shared/models/user';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
    public form: FormGroup;
    public addLanguagesList: string[] = [];
    public availableAddLanguages$: BehaviorSubject<string[]> = new BehaviorSubject([]);
    public uri: string = '';

    constructor(
        private userManager: UserManagerService,
        private authFactory: AuthenticationFactory,
        private translationService: TranslationService,
        private formBuilder: FormBuilder
    ) {
    }

    public ngOnInit(): void {
        forkJoin({
            user: this.getUser(),
            addLanguages: this.getAdditionalLanguages()
        }).subscribe(
            ({user, addLanguages}) => {
                this.addLanguagesList = addLanguages;
                this.createForm(user, addLanguages);
                this.computeAddLanguages(this.form.get('main_language').value);
            }
        );
    }

    public submit(): void {
        if (this.form.valid) {
            console.log('submit');
            this.userManager.updateUser(this.form.value).subscribe(
                (user: User) => console.log(user)
            );
        }
    }

    public computeAddLanguages(currentMainLanguage: string): void {
        const languageList = this.removeFromArray(currentMainLanguage, this.addLanguagesList);
        this.availableAddLanguages$.next(languageList);
        const langForm = this.form.get('languages');
        const languageFormValue = this.removeFromArray(currentMainLanguage, langForm.value);
        langForm.setValue(languageFormValue);
    }

    // tslint:disable-next-line:typedef
    private createForm(user: User, addLanguages: string[]) {
        this.form = this.formBuilder.group({
                first_name: [
                    user.firstName, [
                        Validators.required,
                        Validators.minLength(1),
                        Validators.maxLength(20)
                    ]
                ],
                last_name: [
                    user.lastName,
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
                        AppValidators.restrictEnum(this.getGenders())
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
                        AppValidators.restrictEnum(this.languages())
                    ]
                ],
                languages: [
                    user.languages,
                    [
                        AppValidators.restrictEnumArray(addLanguages)
                    ]
                ]
            }
        );
    }

    private getUser(): Observable<User> {
        return new Observable(subscriber => {
            this.authFactory.getAuthenticator().getUserId().subscribe(
                userId => {
                    this.userManager.getUser(userId).subscribe(
                        (user: User) => {
                            subscriber.next(user);
                            subscriber.complete();
                        }
                    );
                }
            );
        });
    }

    private languages(): string[] {
        return this.translationService.getLanguagesAsArray();
    }


    private getAdditionalLanguages(): Observable<string[]> {
        return of(['ru', 'en', 'fr']);
    }

    private getGenders(): string[] {
        return ['male', 'female'];
    }

    private removeFromArray(value: string, array: string[]): string[] {
        const arrayCopy = Object.assign([], array);
        const index = arrayCopy.indexOf(value, 0);
        if (index > -1) {
            arrayCopy.splice(index, 1);
        }

        return arrayCopy;
    }
}
