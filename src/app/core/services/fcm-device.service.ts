import { Injectable } from '@angular/core';
import { once } from '@app/core/decorators/once';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { FcmDevicesApiService } from '@app/core/services/fcm-devices-api.service';
import { NotificationWorkerService } from '@app/core/services/notification-worker.service';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FcmDeviceService {

  constructor(
    private readonly fcmDevicesApi: FcmDevicesApiService,
    private readonly auth: AuthenticationService,
  ) {
  }

  @once
  public subscribeToAuth(): void {
    NotificationWorkerService.isInitialized.pipe(
      filter(isInited => isInited),
      switchMap(() => this.auth.isAuthenticated$.pipe(
        filter(isAuth => isAuth),
        switchMap(() => this.saveTokenOrUpdateActivity())),
      ),
    ).subscribe();
  }

  private async saveTokenOrUpdateActivity(): Promise<void> {
    if (firebase.messaging.isSupported() && Notification.permission === 'granted') {
      this.fcmDevicesApi.saveTokenOrUpdateActivity(await firebase.messaging().getToken()).subscribe();
    }
  }
}
