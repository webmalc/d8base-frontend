import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '@app/core/models/user';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {ProfileFormService} from '@app/profile/forms/profile-form.service';
import {Language} from '@app/profile/models/language';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class ProfileService {

    private availableAddsLanguages: Language[];
    private availableAddsLanguages$: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>([]);

    private genderList: string[] = ['male', 'female'];


    private form: FormGroup;

    constructor(
        private userManager: UserManagerService,
        private formService: ProfileFormService,
        private languagesApi: LanguagesApiService
    ) {
    }

    public createProfileForm$(): Observable<FormGroup> {
        return forkJoin({
            user: this.getUser$(),
            languages: this.getLanguages$(),
            additionalLanguages: this.getAdditionalLanguages$()
        }).pipe(
            switchMap(({user, languages, additionalLanguages}) => {
                this.formService.setValidators(languages, additionalLanguages);
                this.availableAddsLanguages = additionalLanguages;
                const form = this.formService.createForm(user);
                this.form = form;

                return of<FormGroup>(form);
            })
        );
    }

    public getLanguages$(): Observable<Language[]> {
        return this.languagesApi.getLanguages();
    }

    public getGenders(): string[] {
        return this.genderList;
    }

    public getAvailableAdditionalLanguages$(): BehaviorSubject<Language[]> {
        return this.availableAddsLanguages$;
    }

    public recomputeAdditionalLanguages(): void {
        const currentLanguage = this.form.get(ProfileFormFields.Language).value;
        if (currentLanguage && this.availableAddsLanguages) {
            const addsLanguageList = this.removeFromLanguagesArray(currentLanguage, this.availableAddsLanguages);
            this.availableAddsLanguages$.next(addsLanguageList);
            const addsLangFormControl = this.form.get(ProfileFormFields.AdditionalLanguages);
            const languageFormValue = this.removeFromArray(
                currentLanguage,
                addsLangFormControl.value
            );
            addsLangFormControl.setValue(languageFormValue);
        }

    }

    public updateUser(user: User): void {
        this.userManager.updateUser(user).subscribe(
            (updatedUser: User) => console.log(updatedUser)
        );
    }

    private getUser$(): Observable<User> {
        return this.userManager.getCurrentUser();
    }

    private getAdditionalLanguages$(): Observable<Language[]> {
        return this.languagesApi.getLanguages();
    }

    private removeFromArray(value: string, array: string[]): string[] {
        const arrayCopy = Object.assign([], array);
        const index = arrayCopy.indexOf(value, 0);
        if (index > -1) {
            arrayCopy.splice(index, 1);
        }

        return arrayCopy;
    }

    private removeFromLanguagesArray(value: string, array: Language[]): Language[] {
        const arrayCopy = Object.assign([], array);
        const index = arrayCopy.findIndex((item: Language) => item.code === value);
        if (index > -1) {
            arrayCopy.splice(index, 1);
        }

        return arrayCopy;
    }
}
