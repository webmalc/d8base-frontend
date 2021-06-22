import { Component } from '@angular/core';
import { AuthenticationService, MasterManagerService, PlatformService } from '@app/core/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { MenuController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewMessagesNotificationService } from '@app/shared/services/new-messages-notification.service';
import HeaderContext from './header-context.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public context$: Observable<HeaderContext>;

  @Select(CurrentUserSelectors.language)
  public currentLanguage$: Observable<string>;

  public countOfUnreadMessages$ = this.unreadMessagesService.unreadMessages$.pipe(map(response => response.count));

  private readonly isAuthenticated$: Observable<boolean>;

  constructor(
    private readonly platformService: PlatformService,
    private readonly menuController: MenuController,
    public readonly unreadMessagesService: NewMessagesNotificationService,
    authenticator: AuthenticationService,
    masterManager: MasterManagerService,
  ) {
    this.isAuthenticated$ = authenticator.isAuthenticated$;
    this.context$ = combineLatest([this.isAuthenticated$, masterManager.isMaster$]).pipe(
      map(([isAuthenticated, isMaster]) => ({ isAuthenticated, isMaster })),
    );
  }

  public isDesktop(): boolean {
    return this.platformService.isDesktop();
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
}
