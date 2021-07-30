import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { filter, mapTo } from 'rxjs/operators';

@Injectable()
export class CurrentUserFacadeService {
  /**
   * Fires when user becomes authenticated
   */
  public whenAuthenticated$: Observable<void>;

  @Select(CurrentUserSelectors.isAuthenticated)
  public readonly isAuthenticated$: Observable<boolean>;

  constructor() {
    this.whenAuthenticated$ = this.isAuthenticated$.pipe(
      filter(x => !!x),
      mapTo(void 0),
    );
  }
}
