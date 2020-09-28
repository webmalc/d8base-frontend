import {Injectable} from '@angular/core';
import {FcmDeviceDisableService} from '@app/core/services/fcm-device-disable.service';

@Injectable({
    providedIn: 'root'
})
export class PreLogoutService {

    constructor(private fcmDeviceDisabler: FcmDeviceDisableService) {
    }

    public run(): Promise<any> {
        return Promise.all([
        ]);
    }
}
