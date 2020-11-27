import {Component, OnInit} from '@angular/core';
import {Currency} from '@app/core/models/currency';
import {DarkModeService} from '@app/core/services';
import {CurrencyListApiService} from '@app/core/services/currency-list-api.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Country} from '@app/profile/models/country';
import {UserSettingsService} from '@app/shared/services/user-settings.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-flag-menu',
    templateUrl: './flag-menu.component.html',
    styleUrls: ['./flag-menu.component.scss']
})
export class FlagMenuComponent implements OnInit {

    public country: Country | null;
    public darkTheme$: Observable<boolean>;
    public currencyList: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([]);

    constructor(
        public readonly userSettings: UserSettingsService,
        public readonly userManager: UserManagerService,
        private readonly darkModeService: DarkModeService,
        private readonly currency: CurrencyListApiService
    ) {
        this.darkTheme$ = darkModeService.darkTheme$;
    }

    public ngOnInit(): void {
        this.userManager.getDefaultUserCountry().subscribe(res => this.country = res);
        this.currency.getList().subscribe(list => this.currencyList.next(list));
    }

    public changeMode(event: CustomEvent): void {
        const toggle = event.target as HTMLIonToggleElement;
        this.darkModeService.setMode(toggle.checked);
    }
}
