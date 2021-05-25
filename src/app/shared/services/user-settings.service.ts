import { Injectable } from '@angular/core';
import { UserSettings } from '@app/api/models';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  @Select(CurrentUserSelectors.settings)
  public readonly settings$: Observable<UserSettings | null>;

  public readonly userSettings$: Observable<UserSettings>;

  public langList: Array<UserSettings['language']> = ['en', 'ru'];
  public currencyList: Array<UserSettings['currency']> = ['CAD', 'EUR', 'RUB', 'USD'];
  public unitsList: Array<UserSettings['units']> = [0, 1];
  public firstDayOfWeekList: Array<UserSettings['is_monday_start_of_a_week']> = [false, true];

  constructor() {
    this.userSettings$ = this.settings$.pipe(
      filter(x => !!x),
      shareReplay(1),
    );
  }

  @Dispatch()
  public setCurrency(currency: UserSettings['currency']): CurrentUserActions.ChangeUserSettings {
    return new CurrentUserActions.ChangeUserSettings({ currency });
  }

  @Dispatch()
  public setLanguage(language: UserSettings['language']): CurrentUserActions.ChangeUserSettings {
    return new CurrentUserActions.ChangeUserSettings({ language });
  }

  @Dispatch()
  public setUnits(units: UserSettings['units']): CurrentUserActions.ChangeUserSettings {
    return new CurrentUserActions.ChangeUserSettings({ units });
  }

  @Dispatch()
  public setFirstDayOfWeek(
    is_monday_start_of_a_week: UserSettings['is_monday_start_of_a_week'],
  ): CurrentUserActions.ChangeUserSettings {
    return new CurrentUserActions.ChangeUserSettings({ is_monday_start_of_a_week });
  }
}
