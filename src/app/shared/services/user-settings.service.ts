import { Injectable } from '@angular/core';
import { UserSettings } from '@app/core/models/user-settings';
import { ChangeUserSettings } from '@app/store/current-user/current-user.actions';
import { CurrentUserSelectors } from '@app/store/current-user/current-user.selectors';
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

  public langList = ['en', 'ru'];
  public currencyList = ['CAD', 'EUR', 'RUB', 'USD'];
  public unitsList = [0, 1];

  constructor() {
    this.userSettings$ = this.settings$.pipe(
      filter(x => !!x),
      shareReplay(1),
    );
  }

  @Dispatch()
  public setCurrency(currency: 'CAD' | 'EUR' | 'RUB' | 'USD'): ChangeUserSettings {
    return new ChangeUserSettings({ currency });
  }

  @Dispatch()
  public setLanguage(language: 'en' | 'ru'): ChangeUserSettings {
    return new ChangeUserSettings({ language });
  }

  @Dispatch()
  public setUnits(units: 0 | 1): ChangeUserSettings {
    return new ChangeUserSettings({ units });
  }
}
