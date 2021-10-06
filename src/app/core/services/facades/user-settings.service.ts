import { Injectable } from '@angular/core';
import { UserSettings } from '@app/api/models';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

@Injectable()
export class UserSettingsService {
  @Select(CurrentUserSelectors.settings)
  public readonly settings$: Observable<UserSettings | null>;

  public readonly userSettings$: Observable<UserSettings>;

  public langList: Array<UserSettings['language']> = ['en', 'ru', 'de', 'fr', 'es'];
  public unitsList: Array<UserSettings['units']> = [0, 1];
  public firstDayOfWeekList: Array<UserSettings['is_monday_start_of_a_week']> = [false, true];

  constructor() {
    this.userSettings$ = this.settings$.pipe(
      filter(x => !!x),
      shareReplay(1),
    );
  }

  @Dispatch()
  public saveSettings(newSettings: Partial<UserSettings>): CurrentUserActions.ChangeUserSettings {
    return new CurrentUserActions.ChangeUserSettings(newSettings);
  }

  @Dispatch()
  public saveSettingsLanguage(newLanguage: UserSettings['language']): CurrentUserActions.ChangeUserSettingsLanguage {
    return new CurrentUserActions.ChangeUserSettingsLanguage(newLanguage);
  }
}
