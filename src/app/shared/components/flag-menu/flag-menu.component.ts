import { Component } from '@angular/core';
import { Currency } from '@app/core/models/currency';
import { DarkModeService } from '@app/core/services';
import { CurrencyListApiService } from '@app/core/services/currency-list-api.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { Country } from '@app/profile/models/country';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-flag-menu',
    templateUrl: './flag-menu.component.html',
    styleUrls: ['./flag-menu.component.scss'],
})
export class FlagMenuComponent {

    public country$: Observable<Country>;
    public darkTheme$: Observable<boolean>;
    public currencyList$: Observable<Currency[]>;

    constructor(
        public readonly userSettings: UserSettingsService,
        private readonly darkModeService: DarkModeService,
        userManager: UserManagerService,
        currency: CurrencyListApiService,
    ) {
        this.darkTheme$ = darkModeService.darkTheme$;
        this.country$ = userManager.getDefaultUserCountry();
        this.currencyList$ = currency.getList();
    }

    public changeMode(event: CustomEvent): void {
        const toggle = event.target as HTMLIonToggleElement;
        this.darkModeService.setMode(toggle.checked);
    }
}
