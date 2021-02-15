import { Injectable } from '@angular/core';
import { Profile } from '@app/api/models';
import { Country } from '@app/profile/models/country';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<any>;

  public getDefaultUserCountry(): Observable<Country> {
    return of(null); // TODO is it needed?
  }

  public getCurrentUser(): Observable<Profile> {
    return this.profile$.pipe(first());
  }

  @Dispatch()
  public updateUser(profile: Partial<Profile>): CurrentUserActions.UpdateProfile {
    return new CurrentUserActions.UpdateProfile(profile);
  }
}
