import {Injectable} from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/messaging';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NotificationWorkerService {

    public messageReceived$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public static isFirebaseSupported(): boolean {
        return firebase.messaging.isSupported();
    }

    public async init(): Promise<void> {
        return new Promise<void>(async resolve => {
            const registration = await navigator.serviceWorker.register('../../../firebase-messaging-sw.js');
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
                messaging.getToken().then(
                    (refreshedToken: string) => {
                        console.log(refreshedToken);
                    }).catch((err) => {
                    console.error(err);
                });
            });
            resolve();
        });
    }

    public requestPermission(): Promise<void> {
        return new Promise<void>(async resolve => {
            if (!Notification || !NotificationWorkerService.isFirebaseSupported()) {
                return resolve();
            }
            Notification.requestPermission().finally(() => resolve());
        });
    }
}
