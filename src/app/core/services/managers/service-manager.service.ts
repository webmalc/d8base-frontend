import { Injectable } from '@angular/core';
import { Price, ProfessionalList, Service, ServiceLocation, ServicePhoto, ServiceTag } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { forkJoin, Observable, of } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

@Injectable()
export class ServiceManagerService {
  @Select(CurrentUserSelectors.defaultProfessional)
  public readonly professional$: Observable<ProfessionalList>;

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

  public createService(data: {
    service: Service;
    price: Price;
    photos: ServicePhoto[];
    locations: ServiceLocation[];
    tags: ServiceTag[];
  }): Observable<Service> {
    const { service, price, photos, locations, tags } = data;
    return this.api
      .accountsServicesCreate(service)
      .pipe(
        switchMap(service =>
          forkJoin([
            this.createPrice(price, service.id),
            this.createPhotos(photos, service.id),
            this.createLocations(locations, service.id),
            this.createTags(tags, service.id),
          ]).pipe(mapTo(service)),
        ),
      );
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

  private createPrice(price: Price, service: number): Observable<Price> {
    return this.api.accountsServicePricesCreate({
      ...price,
      service,
    });
  }

  private createPhotos(photos: ServicePhoto[], service: number): Observable<ServicePhoto[]> {
    return photos.length > 0
      ? forkJoin(photos.map(photo => this.api.accountsServicePhotosCreate({ ...photo, service })))
      : of([]);
  }

  private createLocations(locations: ServiceLocation[], service: number): Observable<ServiceLocation[]> {
    return locations.length > 0
      ? forkJoin(locations.map(location => this.api.accountsServiceLocationsCreate({ ...location, service })))
      : of([]);
  }

  private createTags(tags: ServiceTag[], service: number): Observable<ServiceTag[]> {
    return tags.length > 0
      ? forkJoin(tags.map(tag => this.api.accountsServiceTagsCreate({ ...tag, service })))
      : of([]);
  }
}
