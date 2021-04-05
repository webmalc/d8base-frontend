import { Component } from '@angular/core';
import { Rate, UserLocation } from '@app/api/models';
import { RatesApiCache } from '@app/core/services/cache';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-flag-menu',
  templateUrl: './flag-menu.component.html',
  styleUrls: ['./flag-menu.component.scss'],
})
export class FlagMenuComponent {
  public defaultLocation$: Observable<UserLocation>;
  public rateList$: Observable<Rate[]>;

  constructor(
    public readonly userSettingsService: UserSettingsService,
    userManager: UserManagerService,
    rates: RatesApiCache,
  ) {
    this.defaultLocation$ = userManager.defaultLocation$.pipe(filter(x => !!x));
    this.rateList$ = rates.list();
  }
}
