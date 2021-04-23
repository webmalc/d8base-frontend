import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact, Profile, UserContact, UserLanguage } from '@app/api/models';
import { UserLocation } from '@app/core/models/user-location';
import { NgDestroyService } from '@app/core/services';
import { ContactsApiCache } from '@app/core/services/cache';
import { HelperService } from '@app/core/services/helper.service';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { ProfileService } from '@app/profile/services/profile.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import UserContactSelectors from '@app/store/current-user/user-contacts/user-contacts.selectors';
import UserLanguagesSelectors from '@app/store/current-user/user-language-state/user-language.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { Country } from './models/country';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [NgDestroyService],
})
export class ProfilePage {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  @Select(UserLanguagesSelectors.entities)
  public userLanguages$: Observable<UserLanguage[]>;

  @Select(UserContactSelectors.contacts)
  public contacts$: Observable<UserContact[]>;

  @Select(CurrentUserSelectors.profileCountry)
  public profileCountry$: Observable<Country['id']>;

  public contactsWithDefault$: Observable<UserContact[]>;

  public avatar$: Observable<string>;
  public avatarSelector = new FormControl();

  public formFields = ProfileFormFields;
  public defaultLocation$: BehaviorSubject<UserLocation> = new BehaviorSubject<UserLocation>(null);
  public additionalLocationsList$: BehaviorSubject<UserLocation[]> = new BehaviorSubject<UserLocation[]>([]);

  constructor(
    public readonly profileService: ProfileService,
    private readonly contactsApiCache: ContactsApiCache,
    private readonly ngDestroy$: NgDestroyService,
  ) {
    this.avatar$ = this.profile$.pipe(
      filter(x => !!x),
      map(profile => profile.avatar || HelperService.getNoAvatarLink()),
    );
    this.subOnAvatarChange();
    this.initLocation();
    this.initContactsWithDefault();
  }

  private subOnAvatarChange(): void {
    this.avatarSelector.valueChanges
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(avatar => this.profileService.updateUser({ avatar }));
  }

  private initLocation(): void {
    this.profileService.initLocation().subscribe(locationList => {
      this.defaultLocation$.next(locationList.pop() as UserLocation);
      this.additionalLocationsList$.next(locationList as UserLocation[]);
    });
  }

  private initContactsWithDefault(): void {
    this.contactsWithDefault$ = combineLatest([
      this.contacts$,
      this.profileCountry$.pipe(
        filter(country => Boolean(country)),
        switchMap(profileCountry => this.contactsApiCache.listDefaultByCountry(profileCountry)),
      ),
    ]).pipe(map(([userContacts, defaultContacts]) => this.mergeUserWithDefaultContacts(userContacts, defaultContacts)));
  }

  private mergeUserWithDefaultContacts(userContacts: UserContact[], defaultContacts: Contact[]): UserContact[] {
    const emptyDefaultContacts: UserContact[] = defaultContacts
      .filter(defaultContact => !userContacts?.some(({ contact }) => contact === defaultContact.id))
      .map(defaultContact => ({
        id: null,
        contact: defaultContact.id,
        contact_code: defaultContact.code,
        contact_display: defaultContact.name,
        value: '',
      }));

    return [...emptyDefaultContacts, ...userContacts];
  }
}
