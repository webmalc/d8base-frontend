import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile, UserLanguage } from '@app/api/models';
import { UserLocation } from '@app/core/models/user-location';
import { NgDestroyService } from '@app/core/services';
import { HelperService } from '@app/core/services/helper.service';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { ProfileService } from '@app/profile/services/profile.service';
import { UserContactApiService } from '@app/profile/services/user-contact-api.service';
import { ClientContactInterface } from '@app/shared/interfaces/client-contact-interface';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import UserLanguagesSelectors from '@app/store/current-user/user-language-state/user-language.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, takeUntil } from 'rxjs/operators';
import { ContactApiService } from './services/contact-api.service';

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

  public avatar$: Observable<string>;
  public avatarSelector = new FormControl();

  public formFields = ProfileFormFields;
  public defaultLocation$: BehaviorSubject<UserLocation> = new BehaviorSubject<UserLocation>(null);
  public additionalLocationsList$: BehaviorSubject<UserLocation[]> = new BehaviorSubject<UserLocation[]>([]);

  public contacts$: Observable<ClientContactInterface[]>;

  constructor(
    public readonly profileService: ProfileService,
    private readonly contactsApi: UserContactApiService,
    private readonly contactsReadonlyApi: ContactApiService,
    private readonly ngDestroy$: NgDestroyService,
  ) {
    this.avatar$ = this.profile$.pipe(
      filter(x => !!x),
      map(profile => profile.avatar || HelperService.getNoAvatarLink()),
    );
    this.contacts$ = this.getContacts();
    this.subOnAvatarChange();
    this.initLocation();
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

  private getContacts(): Observable<ClientContactInterface[]> {
    return forkJoin([this.contactsReadonlyApi.get({ is_default: '1' }), this.contactsApi.get()]).pipe(
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
}
