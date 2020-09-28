import {Injectable} from '@angular/core';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {FcmDevicesApiService} from '@app/core/services/fcm-devices-api.service';
import {firebase} from '@firebase/app';
import '@firebase/messaging';
import {filter} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FcmDeviceService {

    constructor(
        private fcmDevicesApi: FcmDevicesApiService,
        private auth: AuthenticationService
    ) {
    }

    public subscribeToAuth(): void {
        this.auth.isAuthenticated$.pipe(filter(isAuth => isAuth)).subscribe(
            _ => this.saveTokenOrUpdateActivity()
        );
    }

    private saveTokenOrUpdateActivity(): void {
        if (firebase.messaging.isSupported() && Notification.permission === 'granted') {
            firebase.messaging().getToken().then(token => this.fcmDevicesApi.saveTokenOrUpdateActivity(token).subscribe(
                data => console.log(data)
            ));
        }
    }
}
