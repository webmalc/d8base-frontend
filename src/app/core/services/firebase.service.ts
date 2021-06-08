import { Inject, Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { CommunicationService } from '@app/api/services';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { FirebaseApp } from '@angular/fire';
import { WINDOW } from '@app/core/injection-tokens';
import { catchError, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { GCMDevice } from '@app/api/models/gcmdevice';
import { HttpErrorResponse } from '@angular/common/http';

function newDevice(registrationId: string): GCMDevice {
  return {
    cloud_message_type: 'FCM',
    registration_id: registrationId,
    active: true,
  };
}

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(
    private readonly firebaseMessaging: AngularFireMessaging,
    private readonly firebaseApp: FirebaseApp,
    private readonly swPush: SwPush,
    private readonly swUpdate: SwUpdate,
    private readonly communicationsApi: CommunicationService,
    @Inject(WINDOW) private readonly window: Window,
  ) {
    this.requestPermission();
    this.subscribeToMessages();
    this.subscribeToSwUpdate();
  }

  private requestPermission(): void {
    this.firebaseMessaging.requestToken.subscribe(
      token => this.updateFcmInfo(token),
      error => {
        console.error('Firebase initialization failed!', error.message);
      },
    );
  }

  private updateFcmInfo(registrationId: string): void {
    this.communicationsApi
      .communicationDevicesFcmRead(registrationId)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          error ? this.communicationsApi.communicationDevicesFcmCreate(newDevice(registrationId)) : throwError(error),
        ),
        switchMap(device =>
          device.active
            ? of(device)
            : this.communicationsApi.communicationDevicesFcmPartialUpdate({
                registrationId: device.registration_id,
                data: { registration_id: registrationId, active: true },
              }),
        ),
      )
      .subscribe();
  }

  private subscribeToMessages(): void {
    this.firebaseMessaging.messages.subscribe(message => {
      // TODO emit the corresponding event
      // eslint-disable-next-line no-console
      console.log('message received: ', message);
    });
  }

  private subscribeToSwUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.swUpdate.activateUpdate().then(() => {
          this.window.location.reload();
        });
      });
    }
  }
}
