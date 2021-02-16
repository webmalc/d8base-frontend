import { Injectable } from '@angular/core';
import { Profile, UserLocation } from '@app/api/models';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  @Select(CurrentUserSelectors.defaultLocation)
  public defaultLocation$: Observable<UserLocation>;

  public getCurrentUser(): Observable<Profile> {
    return this.profile$.pipe(first());
  }

  @Dispatch()
  public updateUser(profile: Partial<Profile>): CurrentUserActions.UpdateProfile {
    return new CurrentUserActions.UpdateProfile(profile);
  }
}
