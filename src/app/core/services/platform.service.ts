import { Injectable } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class PlatformService {
  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
  ) {
    this.initializePlatform();
  }

  public isDesktop(): boolean {
    return this.platform.is('desktop');
  }

  private async initializePlatform(): Promise<void> {
    await this.platform.ready();

    if (!this.isDesktop()) {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }
  }
}
