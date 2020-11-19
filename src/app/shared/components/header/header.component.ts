import {Component, OnInit} from '@angular/core';
import {AuthenticationFactory, CountriesApiService, MasterManagerService, UserLocationApiService} from '@app/core/services';
import {Country} from '@app/profile/models/country';
import {Platform} from '@ionic/angular';
import {Observable} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public isAuthenticated$: Observable<boolean>;
    public countryCode: string;

    constructor(
        public readonly masterManager: MasterManagerService,
        private readonly platform: Platform,
        private readonly userLocationApi: UserLocationApiService,
        private readonly countryApi: CountriesApiService,
        private readonly authenticationFactory: AuthenticationFactory
    ) {
        this.isAuthenticated$ = this.authenticationFactory.getAuthenticator().isAuthenticated$;
    }

    public ngOnInit(): void {
        this.getDefaultUserCountry().subscribe(c => this.countryCode = c.code.toLowerCase());
    }

    public toggleMenu(): void {
        const splitPane = document.querySelector('ion-split-pane');
        const windowWidth = window.innerWidth;
        const splitPaneShownAt = 992;
        const menu = splitPane.querySelector('ion-menu');
        if (windowWidth >= splitPaneShownAt) {
            splitPane.disabled = !splitPane.disabled;
            menu.disabled = !menu.disabled;
        }
    }

    public isDesktop(): boolean {
        return this.platform.is('desktop');
    }

    public becomeMaster(): void {
        this.masterManager.becomeMaster().subscribe();
    }

    private getDefaultUserCountry(): Observable<Country> {
        return this.isAuthenticated$.pipe(
            filter(isAuth => isAuth),
            switchMap(_ => this.userLocationApi.getDefaultLocation().pipe(
                filter(location => (location && location.country && true)),
                switchMap(location => this.countryApi.getByEntityId(location.country as number))
            ))
        );
    }
}
