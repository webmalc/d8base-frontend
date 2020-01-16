import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {DarkModeService} from './shared/services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public darkTheme = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private darkModeService: DarkModeService
  ) {
    this.initializeApp();
    this.initDarkMode();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private initDarkMode() {
    this.darkModeService.isDarkMode().then((data: boolean) => {
      this.darkTheme = data;
    });
  }

  public changeMode(data: any) {
    this.darkTheme = data.target.checked;
    this.darkModeService.setMode(data.target.checked);
  }
}
