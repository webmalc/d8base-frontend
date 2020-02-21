import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ProfileFormService} from '@app/profile/forms/profile-form.service';
import {User} from '@app/shared/models/user';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {

    private availableAddsLanguages: string[];
    private availableAddsLanguages$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    private mainLanguages$: Observable<string[]> = of(['en', 'ru']);
    private additionalLanguages$: Observable<string[]> = of(['en', 'ru', 'fr', 'ua', 'kz']);
    private genderList$: Observable<string[]> = of(['male', 'female']);


    private form: FormGroup;

    constructor(
        private userManager: UserManagerService,
        private authFactory: AuthenticationFactory,
        private formService: ProfileFormService
    ) {
    }

    private static removeFromArray(value: string, array: string[]): string[] {
        const arrayCopy = Object.assign([], array);
        const index = arrayCopy.indexOf(value, 0);
        if (index > -1) {
            arrayCopy.splice(index, 1);
        }

        return arrayCopy;
    }

    public createProfileForm$(): Observable<FormGroup> {
        return forkJoin({
            user: this.getUser$(),
            languages: this.getLanguages$(),
            additionalLanguages: this.getAdditionalLanguages$(),
            genderList: this.getGenders$()
        }).pipe(
            switchMap(({user, languages, additionalLanguages, genderList}) => {
                this.formService.setValidators(languages, additionalLanguages, genderList);
                this.availableAddsLanguages = additionalLanguages;
                const form = this.formService.createForm(user);
                this.form = form;

                return of<FormGroup>(form);
            })
        );
    }

    public getLanguages$(): Observable<string[]> {
        return this.mainLanguages$;
    }

    public getGenders$(): Observable<string[]> {
        return this.genderList$;
    }

    public getAvailableAdditionalLanguages$(): BehaviorSubject<string[]> {
        return this.availableAddsLanguages$;
    }

    public recomputeAdditionalLanguages(): void {
        const currentLanguage = this.form.get('main_language').value;
        if (currentLanguage && this.availableAddsLanguages) {
            const addsLanguageList = ProfileService.removeFromArray(currentLanguage, this.availableAddsLanguages);
            this.availableAddsLanguages$.next(addsLanguageList);
            const addsLangFormControl = this.form.get('languages');
            const languageFormValue = ProfileService.removeFromArray(currentLanguage, addsLangFormControl.value);
            addsLangFormControl.setValue(languageFormValue);
        }

    }

    private getUser$(): Observable<User> {
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

    private getAdditionalLanguages$(): Observable<string[]> {
        return this.additionalLanguages$;
    }
}
