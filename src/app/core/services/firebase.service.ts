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
import { CurrentUser } from '@app/store/facades';

function newDevice(registrationId: string): GCMDevice {
  return {
    cloud_message_type: 'FCM',
    registration_id: registrationId,
    active: true,
  };
}

@Injectable()
export class FirebaseService {
  constructor(
    private readonly firebaseMessaging: AngularFireMessaging,
    private readonly firebaseApp: FirebaseApp,
    private readonly swPush: SwPush,
    private readonly swUpdate: SwUpdate,
    private readonly communicationsApi: CommunicationService,
    private readonly currentUser: CurrentUser,
    @Inject(WINDOW) private readonly window: Window,
  ) {
    this.subscribeToUser();
    this.subscribeToMessages();
    this.subscribeToSwUpdate();
  }

  private subscribeToUser(): void {
    this.currentUser.whenAuthenticated$.pipe(switchMap(() => this.firebaseMessaging.requestToken)).subscribe(
      token => this.updateFcmInfo(token),
      error => {
        console.warn('Firebase initialization failed.', error.message);
      },
    );
  }

  private updateFcmInfo(registrationId: string): void {
    if (!registrationId) {
      console.error('Registration id is not correct.');
      return;
    }

    this.communicationsApi
      .communicationDevicesFcmRead(registrationId)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          error.status === 404
            ? this.communicationsApi.communicationDevicesFcmCreate(newDevice(registrationId))
            : throwError(error),
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
