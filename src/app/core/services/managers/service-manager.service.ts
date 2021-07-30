import { Injectable } from '@angular/core';
import { Service } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceManagerService {
  constructor(
    private readonly api: AccountsService,
    private readonly alertController: AlertController,
    private readonly translate: TranslateService,
  ) {}

  public enableService(service: Service): Observable<void> {
    return this.patchService(service, { is_enabled: true });
  }

  public disableService(service: Service): Observable<void> {
    return this.patchService(service, { is_enabled: false });
  }

  public setAutoConfirm(service: Service, autoConfirm: boolean) {
    return this.patchService(service, { is_auto_order_confirmation: autoConfirm });
  }

  public deleteService(id: number): Observable<void> {
    return new Observable<void>(subscriber => {
      const alertPromise = this.alertController.create({
        message: this.translate.instant('delete-confirmation.delete-service'),
        buttons: [
          {
            text: this.translate.instant('delete-confirmation.cancel'),
            role: 'cancel',
          },
          {
            text: this.translate.instant('delete-confirmation.okay'),
            handler: () => {
              this.api.accountsServicesDelete(id).subscribe(() => {
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
    return this.api
      .accountsServicesUpdate({
        id: service.id,
        data: {
          ...service,
          ...changes,
        },
      })
      .pipe(mapTo(void 0));
  }
}
