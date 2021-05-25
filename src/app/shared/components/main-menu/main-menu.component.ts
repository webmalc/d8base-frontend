import { Component, Input } from '@angular/core';
import { DarkModeService } from '@app/core/services';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MainMenuItem, mainMenuItems } from './main-menu';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  @Input() public isAuthenticated: boolean;
  @Input() public isMaster: boolean;

  public mainMenuItems = mainMenuItems;
  public darkTheme$: Observable<boolean>;

  constructor(private readonly platform: Platform, private readonly darkModeService: DarkModeService) {
    this.darkTheme$ = darkModeService.darkTheme$;
  }

  public isShown(item: MainMenuItem): boolean {
    if (item.guestOnly && this.isAuthenticated) {
      return false;
    }

    if (item.desktopOnly && !this.platform.is('desktop')) {
      return false;
    }

    if ((item.userOnly || item.masterOnly || item.clientOnly) && !this.isAuthenticated) {
      return false;
    }

    if (item.clientOnly && this.isMaster) {
      return false;
    }

    return !(item.masterOnly && !this.isMaster);
  }

  public changeTheme(event: CustomEvent): void {
    const toggle = event.target as HTMLIonToggleElement;
    this.darkModeService.setMode(toggle.checked);
  }
}
