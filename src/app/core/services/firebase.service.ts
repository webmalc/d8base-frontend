import { Inject, Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { CommunicationService } from '@app/api/services';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { FirebaseApp } from '@angular/fire';
import { NAVIGATOR, WINDOW } from '@app/core/injection-tokens';

/* eslint-disable no-console */
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(
    private readonly firebaseMessaging: AngularFireMessaging,
    private readonly firebaseApp: FirebaseApp,
    private readonly swPush: SwPush,
    private readonly swUpdate: SwUpdate,
    private readonly communicationsApi: CommunicationService,
    @Inject(WINDOW) private readonly window: Window,
    @Inject(NAVIGATOR) private readonly navigator: Navigator,
  ) {
    console.log('FirebaseService initializing');
    this.requestPermission();
    this.subscribeOnMessages();
    this.subscribeToSwUpdate();
  }

  private requestPermission(): void {
    this.firebaseMessaging.requestToken.subscribe(
      token => {
        console.log('Got token', token);
      },
      error => {
        console.error('Firebase initialization failed!', error.message);
      },
    );
  }

  private subscribeOnMessages(): void {
    this.firebaseMessaging.messages.subscribe(message => {
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
