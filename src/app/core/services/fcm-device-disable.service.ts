import { Injectable } from '@angular/core';
import { GcmDevice } from '@app/core/models/gcm-device';
import { FcmDevicesApiService } from '@app/core/services/fcm-devices-api.service';
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FcmDeviceDisableService {
  constructor(private readonly fcmDevicesApi: FcmDevicesApiService) {}

  public async disableDevice(): Promise<GcmDevice> {
    const token = await firebase.messaging().getToken();

    return this.fcmDevicesApi.disableDevice(token).toPromise();
  }
}
