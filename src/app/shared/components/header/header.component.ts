import { Component, OnInit } from '@angular/core';
import { AuthenticationService, MasterManagerService } from '@app/core/services';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { Country } from '@app/profile/models/country';
import { MenuController, Platform } from '@ionic/angular';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import HeaderContext from './header-context.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public countryCode$: Observable<string>;
  public context$: Observable<HeaderContext>;

  private readonly isAuthenticated$: Observable<boolean>;

  constructor(
    private readonly platform: Platform,
    private readonly menuController: MenuController,
    private readonly userManager: UserManagerService,
    authenticator: AuthenticationService,
    masterManager: MasterManagerService,
  ) {
    this.isAuthenticated$ = authenticator.isAuthenticated$;
    this.context$ = combineLatest([
      this.isAuthenticated$,
      masterManager.isMaster$,
    ]).pipe(
      map(([isAuthenticated, isMaster]) => ({isAuthenticated, isMaster})),
    );
  }

  public ngOnInit(): void {
    this.countryCode$ = this.isAuthenticated$.pipe(switchMap(
      isAuth => isAuth ? this.userManager.getDefaultUserCountry() : of(this.getTemporaryDefaultCountry()),
    ), map(c => c.code.toLowerCase()));
  }

  public isDesktop(): boolean {
    return this.platform.is('desktop');
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
