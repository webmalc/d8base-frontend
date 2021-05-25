import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { GcmDevice } from '@app/core/models/gcm-device';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FcmDevicesApiService extends AbstractApiService<GcmDevice> {
  private readonly url = environment.backend.fcm_devices;
  private readonly cloudMessageType = 'FCM';

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public disableDevice(token: string): Observable<GcmDevice> {
    return super.getByEntityId(token).pipe(
      switchMap(data => {
        if (!data.active) {
          return of(data);
        }
        data.active = false;

        return super.patch(data, data.registration_id);
      }),
    );
  }

  public saveTokenOrUpdateActivity(token: string): Observable<GcmDevice> {
    return super.getByEntityId(token).pipe(
      switchMap(data => {
        if (data.active) {
          return of(data);
        }
        data.active = true;

        return super.patch(data, data.registration_id);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          const gcmDevice = new GcmDevice();
          gcmDevice.registration_id = token;
          gcmDevice.active = true;
          gcmDevice.cloud_message_type = this.cloudMessageType;

          return super.create(gcmDevice);
        }
        throwError('error while saving gcm device');
      }),
    );
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: GcmDevice): GcmDevice {
    return plainToClass(GcmDevice, data);
  }
}
