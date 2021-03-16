import { Injectable } from '@angular/core';
import { FcmDeviceService } from '@app/core/services/fcm-device.service';
import { environment } from '@env/environment';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import firebase from 'firebase';
import { NotificationWorkerService } from './notification-worker.service';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    private readonly notificationWorker: NotificationWorkerService,
    private readonly fcmDevice: FcmDeviceService,
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    this.initializePlatform().then();
  }

  private async initializePlatform(): Promise<void> {
    await this.platform.ready();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    await this.notificationWorker.init();
    await this.notificationWorker.requestPermission();
    this.fcmDevice.subscribeToAuth();
  }
}
