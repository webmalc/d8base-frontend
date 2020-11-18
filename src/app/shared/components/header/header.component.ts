import {Component, OnInit} from '@angular/core';
import {AuthenticationFactory, CountriesApiService, MasterManagerService, UserLocationApiService} from '@app/core/services';
import {Country} from '@app/profile/models/country';
import {Platform} from '@ionic/angular';
import {Observable, of} from 'rxjs';
import {filter, first, switchMap} from 'rxjs/operators';

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
        authenticationFactory: AuthenticationFactory
    ) {
        this.isAuthenticated$ = authenticationFactory.getAuthenticator().isAuthenticated$;
    }

    public ngOnInit(): void {
        this.getDefaultUserCountry()
            .pipe(filter(code => null !== code))
            .subscribe(c => this.countryCode = c.code.toLowerCase());
    }

    public isDesktop(): boolean {
        return this.platform.is('desktop');
    }

    public becomeMaster(): void {
        this.masterManager.becomeMaster().subscribe();
    }

    private getDefaultUserCountry(): Observable<Country> {
        return this.isAuthenticated$.pipe(
            first(),
            filter(isAuth => isAuth === true),
            switchMap(isAuth => isAuth ? this.userLocationApi.getDefaultLocation().pipe(
                filter(location => location !== undefined),
                switchMap(location => this.countryApi.getByEntityId(location.country as number))
            ) : of(null))
        );
    }
}
