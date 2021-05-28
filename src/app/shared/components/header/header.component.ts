import { Component } from '@angular/core';
import { AuthenticationService, MasterManagerService } from '@app/core/services';
import { UnreadMessagesService } from '@app/core/services/unread-messages.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { MenuController, Platform } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  public countOfUnreadMessages$ = this.unreadMessagesService.unreadMessagesCount();

  private readonly isAuthenticated$: Observable<boolean>;

  constructor(
    private readonly platform: Platform,
    private readonly menuController: MenuController,
    public readonly unreadMessagesService: UnreadMessagesService,
    authenticator: AuthenticationService,
    masterManager: MasterManagerService,
  ) {
    this.isAuthenticated$ = authenticator.isAuthenticated$;
    this.context$ = combineLatest([this.isAuthenticated$, masterManager.isMaster$]).pipe(
      map(([isAuthenticated, isMaster]) => ({ isAuthenticated, isMaster })),
    );
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
}
