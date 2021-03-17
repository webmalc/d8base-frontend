import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Profile } from '@app/api/models';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Profile> {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  public resolve(): Observable<Profile> {
    return this.profile$.pipe(first(x => !!x));
  }
}
