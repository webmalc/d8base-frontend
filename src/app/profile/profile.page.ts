import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Profile, UserLanguage } from '@app/api/models';
import { UserLocation } from '@app/core/models/user-location';
import { CountriesApiCache } from '@app/core/services/cache';
import { LanguagesApiCache } from '@app/core/services/cache/languages-api-cache.service';
import { HelperService } from '@app/core/services/helper.service';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { Country } from '@app/profile/models/country';
import { ProfileService } from '@app/profile/services/profile.service';
import { UserContactApiService } from '@app/profile/services/user-contact-api.service';
import { Reinitable } from '@app/shared/abstract/reinitable';
import { ClientContactInterface } from '@app/shared/interfaces/client-contact-interface';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import * as UserLanguagesActions from '@app/store/current-user/user-language-state/user-language.actions';
import UserLanguagesSelectors from '@app/store/current-user/user-language-state/user-language.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ContactApiService } from './services/contact-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends Reinitable implements OnInit {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  @Select(UserLanguagesSelectors.entities)
  public userLanguages$: Observable<UserLanguage[]>;

  public form: FormGroup;
  public formFields = ProfileFormFields;
  public defaultLocation$: BehaviorSubject<UserLocation> = new BehaviorSubject<UserLocation>(null);
  public additionalLocationsList$: BehaviorSubject<UserLocation[]> = new BehaviorSubject<UserLocation[]>([]);
  public user: Profile;
  public contacts$: Observable<ClientContactInterface[]>;
  public nationality: Country | null;
  public languagesAsString$: Observable<string>;

  constructor(
    public readonly profileService: ProfileService,
    private readonly contactsApi: UserContactApiService,
    private readonly contactsReadonlyApi: ContactApiService,
    private readonly countriesApi: CountriesApiCache,
    private readonly languagesApiCache: LanguagesApiCache,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.languagesAsString$ = this.getUserLanguagesAsString();
  }

  public saveAvatar(data: string): void {
    if (data.slice(0, 7) !== 'http://' || data.slice(0, 8) !== 'https://') {
      this.profileService.updateUser({ avatar: data });
    }
  }

  public getAvatar(): string {
    return this.profileService.avatarForm.get(ProfileFormFields.Avatar).value ?? HelperService.getNoAvatarLink();
  }

  protected init(): void {
    this.loadUserLanguages();
    this.getUserLanguagesAsString();

    this.profileService.createProfileForm$().subscribe(form => (this.form = form));
    this.profile$
      .pipe(
        filter(user => !!user),
        switchMap(user =>
          forkJoin({
            user: of(user),
            nationality: user.nationality ? this.countriesApi.getByEntityId(user.nationality) : of(null),
          }),
        ),
      )
      .subscribe(({ user, nationality }) => {
        this.user = user;
        this.nationality = nationality;
      });
    this.profileService.createAvatarForm().subscribe(() => this.onAvatarChange());
    this.profileService.initLocation().subscribe(locationList => {
      this.defaultLocation$.next(locationList.pop() as UserLocation);
      this.additionalLocationsList$.next(locationList as UserLocation[]);
    });

    this.contacts$ = forkJoin([this.contactsReadonlyApi.get({ is_default: '1' }), this.contactsApi.get()]).pipe(
      map(([defaultContacts, list]) => {
        const emptyDefaultContacts = defaultContacts.results.filter(c => !list.results.some(x => x.contact === c.id));
        return [
          ...emptyDefaultContacts.map(c => ({
            id: null,
            contact: c.id,
            contact_code: c.code,
            contact_display: c.name,
            value: '',
          })),
          ...list.results,
        ];
      }),
      catchError(() => of([])),
    );
  }

  @Dispatch()
  private loadUserLanguages(): UserLanguagesActions.LoadAllUserLanguages {
    return new UserLanguagesActions.LoadAllUserLanguages();
  }

  private onAvatarChange(): void {
    this.profileService.avatarForm
      .get(ProfileFormFields.Avatar)
      .statusChanges.subscribe(() => this.saveAvatar(this.profileService.avatarForm.get(ProfileFormFields.Avatar).value));
  }

  private getUserLanguagesAsString(): Observable<string> {
    return combineLatest([this.userLanguages$, this.languagesApiCache.list()]).pipe(
      map(([userLanguages, languages]) =>
        languages
            .filter(({ code }) => userLanguages.map(({ language }) => language).includes(code as UserLanguage['language']))
            .map(({ name }) => name)
            .join(', '),
      ),
    );
  }
}
