import { Injectable } from '@angular/core';
import { Service } from '@app/service/models/service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ServicesApiService } from './services-api.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceOperationsService {
  constructor(
    private readonly servicesApi: ServicesApiService,
    private readonly alertController: AlertController,
    private readonly translate: TranslateService,
  ) {
  }

  public enableService(service: Service): Observable<void> {
    return this.patchService(service, { is_enabled: true });
  }

  public disableService(service: Service): Observable<void> {
    return this.patchService(service, { is_enabled: false });
  }

  public deleteService(service: Service): Observable<void> {
    return new Observable<void>(subscriber => {
      const alertPromise = this.alertController.create({
        message: this.translate.instant('delete-confirmation.delete-service'),
        buttons: [
          {
            text: this.translate.instant('delete-confirmation.cancel'),
            role: 'cancel',
          }, {
            text: this.translate.instant('delete-confirmation.okay'),
            handler: () => {
              this.servicesApi.delete(service).subscribe(() => {
                subscriber.next();
                subscriber.complete();
              });
            },
          },
        ],
      });
      alertPromise.then(alert => alert.present());
    });
  }

  private patchService(service: Service, changes: Partial<Service>): Observable<void> {
    return this.servicesApi.patch({
      ...service,
      ...changes,
    }).pipe(mapTo(void 0));
  }
}
