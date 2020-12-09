import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationFactory, MasterManagerService} from '@app/core/services';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Country} from '@app/profile/models/country';
import {MenuController, Platform} from '@ionic/angular';
import {Observable, of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isAuthenticated$: Observable<boolean>;
    public countryCode: string;
    private countrySub: Subscription;

    constructor(
        public readonly masterManager: MasterManagerService,
        private readonly platform: Platform,
        private readonly menuController: MenuController,
        authenticationFactory: AuthenticationFactory,
        private readonly userManager: UserManagerService
    ) {
        this.isAuthenticated$ = authenticationFactory.getAuthenticator().isAuthenticated$;
    }

    public ngOnDestroy(): void {
        this.countrySub.unsubscribe();
    }

    public ngOnInit(): void {
        this.countrySub = this.isAuthenticated$.pipe(switchMap(
            isAuth => isAuth ? this.userManager.getDefaultUserCountry() : of(this.getTemporaryDefaultCountry())
        )).subscribe(c => this.countryCode = c.code.toLowerCase());
    }

    public isDesktop(): boolean {
        return this.platform.is('desktop');
    }

    public becomeMaster(): void {
        this.masterManager.becomeMaster().subscribe();
    }

    /**
     * Enable/disable the specified menu. A workaround for wide (desktop) screen only
     */
    public toggleMenu(menuId: string): void {
        this.menuController.get(menuId).then(menu => {
            if (menu.classList.contains('menu-pane-visible')) {
                // the menu is at the side pane, toggle its disabled flag manually
                menu.disabled = !menu.disabled;
            }
        });
    }

    public getTemporaryDefaultCountry(): Country {
        const model = new Country();
        model.code = 'ca';

        return model;
    }
}
