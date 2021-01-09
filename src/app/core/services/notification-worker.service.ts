import { Injectable } from '@angular/core';
import { once } from '@app/core/decorators/once';
import { environment } from '@env/environment';
import { firebase } from '@firebase/app';
import '@firebase/messaging';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationWorkerService {
    public static isInitialized: Observable<boolean>;
    public messageReceived$: Subject<boolean> = new Subject<boolean>();
    private readonly initSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        NotificationWorkerService.isInitialized = this.initSubject.asObservable();
    }

    public static isFirebaseSupported(): boolean {
        return firebase.messaging.isSupported();
    }

    @once
    public async init(): Promise<void> {
        return new Promise<void>(async resolve => {
            const registration = await navigator.serviceWorker?.register('../../../firebase-messaging-sw.js');
            if (!NotificationWorkerService.isFirebaseSupported()) {
                resolve();

                return;
            }
            const messaging = firebase.messaging();
            messaging.useServiceWorker(registration);
            messaging.usePublicVapidKey(environment.firebaseConfig.vapidKey);
            messaging.onMessage((payload: { notification: { click_action: string } }) => {
                this.messageReceived$.next(true);
            });

            messaging.onTokenRefresh(() => {
                messaging
                    .getToken()
                    .then((refreshedToken: string) => {
                        console.warn(refreshedToken);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
            resolve();
        });
    }

    public requestPermission(): Promise<void> {
        return new Promise<void>(async resolve => {
            if (!('Notification' in window) || !Notification || !NotificationWorkerService.isFirebaseSupported()) {
                return resolve();
            }
            Notification.requestPermission().finally(() => {
                this.initSubject.next(true);
                resolve();
            });
        });
    }
}
