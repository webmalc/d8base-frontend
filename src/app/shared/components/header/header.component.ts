import {Component, OnInit} from '@angular/core';
import {once} from '@app/core/decorators/once';
import {AuthenticationFactory, MasterManagerService} from '@app/core/services';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Country} from '@app/profile/models/country';
import {MenuController, Platform} from '@ionic/angular';
import {Observable, of} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';

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
        private readonly menuController: MenuController,
        authenticationFactory: AuthenticationFactory,
        private readonly userManager: UserManagerService
    ) {
        this.isAuthenticated$ = authenticationFactory.getAuthenticator().isAuthenticated$;
    }

    public ngOnInit(): void {
        this.isAuthenticated$.pipe(first(), switchMap(
            isAuth => isAuth ? this.userManager.getDefaultUserCountry() : of(this.getTemporaryDefaultCountry())
        )).subscribe(c => this.countryCode = c.code.toLowerCase());
        this.closeFlagMenu();
    }

    public isDesktop(): boolean {
        return this.platform.is('desktop');
    }

    public becomeMaster(): void {
        this.masterManager.becomeMaster().subscribe();
    }

    public toggleMenu(menuId: string, animated: boolean = true): void {
        this.menuController.get(menuId)
            .then(menu => menu?.classList.contains('menu-pane-visible') ? menu.disabled = !menu.disabled : menu?.toggle(animated));
    }

    @once
    private closeFlagMenu(): void {
        this.toggleMenu('flag-menu', false);
    }

    private getTemporaryDefaultCountry(): Country {
        const model = new Country();
        model.code = 'ca';

        return model;
    }
}
