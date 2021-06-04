import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { CommunicationService } from '@app/api/services';
import { mergeMapTo, tap } from 'rxjs/operators';

/* eslint-disable no-console */
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(
    private readonly firebaseMessaging: AngularFireMessaging,
    private readonly communicationsApi: CommunicationService,
  ) {
    console.log('FirebaseService initializing');
    this.requestPermission();
  }

  private requestPermission(): void {
    this.firebaseMessaging.requestPermission
      .pipe(
        tap(() => console.log('AngularFireMessaging permission granted')),
        mergeMapTo(this.firebaseMessaging.tokenChanges),
      )
      .subscribe(
        token => {
          console.log('AngularFireMessaging got token', token);
        },
        error => {
          console.error(error);
        },
      );
  }
}
