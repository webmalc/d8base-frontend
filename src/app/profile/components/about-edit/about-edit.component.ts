import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '@app/api/models';
import { CountriesApiService } from '@app/core/services';
import { HelperService } from '@app/core/services/helper.service';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { Country } from '@app/profile/models/country';
import { Language } from '@app/profile/models/language';
import { UserLanguage } from '@app/profile/models/user-language';
import { LanguagesApiService } from '@app/profile/services/languages-api.service';
import { UserLanguagesApiService } from '@app/profile/services/user-languages-api.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.scss'],
})
export class AboutEditComponent implements OnInit {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;
  public languages$: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>([]);
  public form: FormGroup;
  public formFields = ProfileFormFields;
  private oldLanguages: UserLanguage[] = [];

  constructor(
    public readonly countriesSearch: SelectableCountryOnSearchService,
    public readonly languagesApi: LanguagesApiService,
    private readonly formBuilder: FormBuilder,
    private readonly userLanguageApi: UserLanguagesApiService,
    private readonly countriesApi: CountriesApiService,
    private readonly router: Router,
    private readonly actions$: Actions,
  ) {}

  public ngOnInit(): void {
    this.profile$
      .pipe(
        first(profile => !!profile),
        switchMap((user: Profile) =>
          forkJoin([
            this.getCountry(user.nationality),
            this.userLanguageApi.get().pipe(
              switchMap(({ results }) => {
                this.oldLanguages = results;
                return this.userLanguagesToLanguages(results).pipe(first());
              }),
            ),
          ]).pipe(map(([nationality, languages]) => ({ user, nationality, languages }))),
        ),
      )
      .subscribe(({ user, nationality, languages }) => {
        this.form = this.formBuilder.group({
          [this.formFields.Birthday]: [user.birthday],
          [this.formFields.Nationality]: [nationality],
          [this.formFields.Languages]: [languages],
        });
      });
    this.languagesApi.getLanguages$().subscribe(languages => this.languages$.next(languages));
  }

  @Dispatch()
  public updateUser(profile: Partial<Profile>): CurrentUserActions.UpdateProfile {
    return new CurrentUserActions.UpdateProfile(profile);
  }

  public submitForm(): void {
    let date: string;
    if (this.form.getRawValue()[this.formFields.Birthday] as string) {
      date = HelperService.fromDatetime(this.form.getRawValue()[this.formFields.Birthday] as string).date;
    }
    const data: Partial<Profile> = {
      birthday: date,
      nationality: (this.form.getRawValue()[this.formFields.Nationality] as Country)?.id,
    };

    const newLanguages: UserLanguage[] = (this.form.getRawValue()[this.formFields.Languages] as Language[]).map(lang =>
      plainToClass(UserLanguage, { language: lang.code }),
    );

    this.updateUser(data);
    const updateUser$ = this.actions$.pipe(first(), ofActionSuccessful(CurrentUserActions.UpdateProfile));

    const updateLanguages$ = this.oldLanguages?.length
      ? this.userLanguageApi.deleteList(this.oldLanguages).pipe(switchMap(() => this.userLanguageApi.createList(newLanguages)))
      : this.userLanguageApi.createList(newLanguages);

    forkJoin([updateLanguages$, updateUser$]).subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  private getCountry(id: number | null): Observable<Country | null> {
    return id ? this.countriesApi.getByEntityId(id.toString()) : of(null);
  }

  private userLanguagesToLanguages(list: UserLanguage[]): Observable<Language[]> {
    return this.languages$.pipe(map(languages => list.map(userLanguage => languages.find(elem => userLanguage.language === elem.code))));
  }
}
