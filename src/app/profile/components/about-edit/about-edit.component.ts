import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Language, Profile, UserLanguage } from '@app/api/models';
import { fromDatetime } from '@app/core/functions/datetime.functions';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { CountriesApiCache } from '@app/core/services/cache';
import { LanguagesApiCache } from '@app/core/services/cache/languages-api-cache.service';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { Country } from '@app/profile/models/country';
import { ColumnHeaderComponent } from '@app/shared/components';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import * as UserLanguagesActions from '@app/store/current-user/user-language-state/user-language.actions';
import UserLanguagesSelectors from '@app/store/current-user/user-language-state/user-language.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-about-edit',
  templateUrl: './about-edit.component.html',
  styleUrls: ['./about-edit.component.scss'],
})
export class AboutEditComponent implements OnInit {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  @Select(UserLanguagesSelectors.entities)
  public userLanguages$: Observable<UserLanguage[]>;

  @ViewChild(ColumnHeaderComponent)
  public header: ColumnHeaderComponent;

  public languages$ = this.languagesApiCache.list();
  public form: FormGroup;
  public formFields = ProfileFormFields;

  constructor(
    public readonly languagesApiCache: LanguagesApiCache,
    private readonly formBuilder: FormBuilder,
    private readonly countriesApi: CountriesApiCache,
    private readonly router: Router,
    private readonly actions$: Actions,
  ) {}

  public ngOnInit(): void {
    this.loadUserLanguages();

    this.profile$
      .pipe(
        first(profile => !!profile),
        switchMap((user: Profile) =>
          combineLatest([
            this.getCountry(user.nationality),
            this.userLanguages$.pipe(
              filter(userLanguages => !!userLanguages),
              switchMap(userLanguages => this.userLanguagesToLanguages(userLanguages).pipe(first())),
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
  }

  @Dispatch()
  public updateUser(profile: Partial<Profile>): CurrentUserActions.UpdateProfile {
    return new CurrentUserActions.UpdateProfile(profile);
  }

  @Dispatch()
  public loadUserLanguages(): UserLanguagesActions.LoadAllUserLanguages {
    return new UserLanguagesActions.LoadAllUserLanguages();
  }

  @Dispatch()
  public updateUserLanguages(newUserLanguages: UserLanguage[]): UserLanguagesActions.UpdateUserLanguagesList {
    return new UserLanguagesActions.UpdateUserLanguagesList(newUserLanguages);
  }

  public submitForm(): void {
    if (isFormInvalid(this.form)) {
      return;
    }

    let date: string;
    if (this.form.value[this.formFields.Birthday]) {
      date = fromDatetime(this.form.value[this.formFields.Birthday]).date;
    }
    const data: Partial<Profile> = {
      birthday: date,
      nationality: this.form.value[this.formFields.Nationality]?.id,
    };

    // TODO: Fix swagger model Language, replace code: string -> UserLanguage['language'] type
    const newLanguages: UserLanguage[] = (this.form.value[this.formFields.Languages] as Language[]).map(({ code }) => ({
      language: code as UserLanguage['language'],
    }));

    this.updateUserLanguages(newLanguages);
    const updateLanguages$ = this.actions$.pipe(
      ofActionSuccessful(UserLanguagesActions.UpdateUserLanguagesList),
      first(),
    );

    this.updateUser(data);
    const updateUser$ = this.actions$.pipe(ofActionSuccessful(CurrentUserActions.UpdateProfile), first());

    forkJoin([updateLanguages$, updateUser$]).subscribe(() => {
      this.header.navigateBack();
    });
  }

  private getCountry(id: number | null): Observable<Country | null> {
    return id ? this.countriesApi.getByEntityId(id) : of(null);
  }

  private userLanguagesToLanguages(list: UserLanguage[]): Observable<Language[]> {
    return this.languages$.pipe(
      map(languages => list.map(userLanguage => languages.find(elem => userLanguage.language === elem.code))),
    );
  }
}
