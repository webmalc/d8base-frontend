import { Component } from '@angular/core';
import { Rate, UserLocation } from '@app/api/models';
import { DarkModeService } from '@app/core/services';
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
  public darkTheme$: Observable<boolean>;
  public rateList$: Observable<Rate[]>;

  constructor(
    public readonly userSettingsService: UserSettingsService,
    private readonly darkModeService: DarkModeService,
    userManager: UserManagerService,
    rates: RatesApiCache,
  ) {
    this.darkTheme$ = darkModeService.darkTheme$;
    this.defaultLocation$ = userManager.defaultLocation$.pipe(filter(x => !!x));
    this.rateList$ = rates.list();
  }

  public changeMode(event: CustomEvent): void {
    const toggle = event.target as HTMLIonToggleElement;
    this.darkModeService.setMode(toggle.checked);
  }
}
