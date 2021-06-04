import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationWorkerService {
  public static isInitialized: Observable<boolean>;
  public messageReceived$: Subject<boolean> = new Subject<boolean>();

  public static isFirebaseSupported(): boolean {
    return false;
  }
}
