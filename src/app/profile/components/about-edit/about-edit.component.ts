import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '@app/core/models/user';
import {CountriesApiService} from '@app/core/services';
import {HelperService} from '@app/core/services/helper.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {Country} from '@app/profile/models/country';
import {Language} from '@app/profile/models/language';
import {UserLanguage} from '@app/profile/models/user-language';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {UserLanguagesApiService} from '@app/profile/services/user-languages-api.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'app-about-edit',
    templateUrl: './about-edit.component.html',
    styleUrls: ['./about-edit.component.scss']
})
export class AboutEditComponent implements OnInit {

    public languages$: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>([]);
    public form: FormGroup;
    public formFields = ProfileFormFields;
    private defaultUserLanguages: UserLanguage[] = [];

    constructor(
        private readonly userManager: UserManagerService,
        public readonly countriesSearch: SelectableCountryOnSearchService,
        public readonly languagesApi: LanguagesApiService,
        private readonly formBuilder: FormBuilder,
        private readonly userLanguageApi: UserLanguagesApiService,
        private readonly countriesApi: CountriesApiService
    ) {
    }

    public ngOnInit(): void {
        let user: User;
        let nationality: Country;
        let userLanguages: UserLanguage[];

        forkJoin({
            usr: this.userManager.getCurrentUser(),
            usrLanguages: this.userLanguageApi.get()
        }).pipe(
            tap(({usr, usrLanguages}) => {
                this.defaultUserLanguages = userLanguages = usrLanguages.results;
                user = usr;
            }),
            switchMap(({usr, usrLanguages}) => this.getCountry(user.nationality)),
            switchMap((country: Country) => {
                nationality = country;

                return this.userLanguagesToLanguages(userLanguages);
            })
        ).subscribe((languages) => this.form = this.formBuilder.group({
            [this.formFields.Birthday]: [user.birthday],
            [this.formFields.Nationality]: [nationality],
            [this.formFields.Languages]: [languages]
        }));
        this.languagesApi.getLanguages$().subscribe(
            langs => this.languages$.next(langs)
        );
    }

    public submitForm(): void {
        let date: string;
        if ((this.form.getRawValue()[this.formFields.Birthday] as string)) {
            date = HelperService.fromDatetime((this.form.getRawValue()[this.formFields.Birthday] as string)).date;
        }
        const data: Partial<User> = {
            birthday: date,
            nationality: (this.form.getRawValue()[this.formFields.Nationality] as Country)?.id
        };
        const userLanguages: UserLanguage[] = (this.form.getRawValue()[this.formFields.Languages] as Language[])
            .map(lang => plainToClass(UserLanguage, {language: lang.code}));

        this.userManager.updateUser(HelperService.clear(data)).subscribe();
        if (this.defaultUserLanguages && this.defaultUserLanguages.length) {
            this.userLanguageApi.deleteList(this.defaultUserLanguages).pipe(
                switchMap(_ => this.userLanguageApi.createList(userLanguages))
            ).subscribe();
        } else {
            this.userLanguageApi.createList(userLanguages).subscribe();
        }
    }

    private getCountry(id: number | null): Observable<Country | null> {
        return id ? this.countriesApi.getByEntityId(id.toString()) : of(null);
    }

    private userLanguagesToLanguages(list: UserLanguage[]): Observable<Language[]> {
        return this.languages$.pipe(
            map(languages => list.map(userLanguage => languages.find(elem => userLanguage.language === elem.code)))
        );
    }
}
