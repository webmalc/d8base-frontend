import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile, UserContact, UserLanguage } from '@app/api/models';
import { UserLocation } from '@app/core/models/user-location';
import { NgDestroyService } from '@app/core/services';
import { ContactsMergeToDefaultService } from '@app/core/services/contacts-merge-to-default.service';
import { HelperService } from '@app/core/services/helper.service';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { ProfileService } from '@app/profile/services/profile.service';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import UserContactSelectors from '@app/store/current-user/user-contacts/user-contacts.selectors';
import UserLanguagesSelectors from '@app/store/current-user/user-language-state/user-language.selectors';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, finalize, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';

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

  @Select(UserLocationSelectors.defaultLocation)
  public defaultLocation$: Observable<UserLocation[]>;

  @Select(UserLocationSelectors.additionalLocations)
  public additionalLocationsList$: Observable<UserLocation[]>;

  public newEmailRegistered$: Observable<CurrentUserActions.RegisterNewEmail['newEmail']> = this.actions$.pipe(
    ofActionSuccessful(CurrentUserActions.RegisterNewEmail),
    map((action: CurrentUserActions.RegisterNewEmail) => action.newEmail),
    takeUntil(this.ngDestroy$),
  );

  public emailVerificationSent$: Observable<CurrentUserActions.ResendEmailVerification>;

  public contactsWithDefault$: Observable<UserContact[]>;

  public avatar$: Observable<string>;
  public avatarLoading$ = new BehaviorSubject<boolean>(false);
  public avatarSelector = new FormControl();

  public formFields = ProfileFormFields;
  constructor(
    public readonly profileService: ProfileService,
    private readonly contactsMergeToDefaultService: ContactsMergeToDefaultService,
    private readonly ngDestroy$: NgDestroyService,
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {
    this.avatar$ = this.profile$.pipe(
      filter(x => !!x),
      map(profile => profile.avatar || HelperService.getNoAvatarLink()),
    );
    this.subOnAvatarChange();
    this.subOnEmailVerificationSent();
    this.initContactsWithDefault();
  }

  public sendConfirmationEmail(): void {
    this.store.dispatch(new CurrentUserActions.ResendEmailVerification());
  }

  private subOnEmailVerificationSent(): void {
    this.emailVerificationSent$ = this.actions$.pipe(
      ofActionSuccessful(CurrentUserActions.ResendEmailVerification),
      withLatestFrom(this.profile$),
      map(([, profile]) => profile.email),
      takeUntil(this.ngDestroy$),
    );
  }

  private subOnAvatarChange(): void {
    this.avatarSelector.valueChanges
      .pipe(
        switchMap((avatar: Profile['avatar']) => {
          this.setAvatarLoading();
          return this.store.dispatch(new CurrentUserActions.UpdateAvatar(avatar));
        }),
        takeUntil(this.ngDestroy$),
        finalize(() => {
          this.setAvatarLoading(false);
        }),
      )
      .subscribe(() => {
        this.setAvatarLoading(false);
      });
  }

  private setAvatarLoading(isLoading: boolean = true): void {
    if (isLoading) {
      this.avatarSelector.disable({ emitEvent: false });
    } else {
      this.avatarSelector.enable({ emitEvent: false });
    }

    this.avatarLoading$.next(isLoading);
  }

  private initContactsWithDefault(): void {
    this.contactsWithDefault$ = this.contactsMergeToDefaultService.contactsMergedWithDefault(this.contacts$);
  }
}
