import { Injectable } from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {mergeMapTo} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  constructor(private afMessaging: AngularFireMessaging) { }

  public requestPushPermission(): void {
    this.afMessaging.requestPermission
        .pipe(mergeMapTo(this.afMessaging.tokenChanges))
        .subscribe(
            (token) => console.log('Permission granted', token),
            (error) => console.error(error)
        );
  }
}
