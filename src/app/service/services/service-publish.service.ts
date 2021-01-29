import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models/professional-list';
import { AccountsService } from '@app/api/services';
import { ServiceSchedule } from '@app/api/models';
import { User } from '@app/core/models/user';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { MasterLocation } from '@app/master/models/master-location';
import { MasterSchedule } from '@app/master/models/master-schedule';
import { MasterLocationApiService } from '@app/master/services/master-location-api.service';
import { MasterScheduleApiService } from '@app/master/services/master-schedule-api.service';
import ServicePublishData from '@app/service/interfaces/service-publish-data.interface';
import { Price } from '@app/service/models/price';
import { Service } from '@app/service/models/service';
import { ServiceLocation } from '@app/service/models/service-location';
import { ServicePhoto } from '@app/service/models/service-photo';
import { PricesApiService } from '@app/core/services/prices-api.service';
import { ServiceLocationApiService } from '@app/core/services/service-location-api.service';
import { ServicePhotoApiService } from '@app/core/services/service-photo-api.service';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from '@app/service/services/service-publish-data-preparer.service';
import { ServicesApiService } from '@app/core/services/services-api.service';
import { forkJoin, from, Observable, of } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ServicePublishService {

  constructor(
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    private readonly masterManager: MasterManagerService,
    private readonly userManager: UserManagerService,
    private readonly serviceApi: ServicesApiService,
    private readonly servicePhotosApi: ServicePhotoApiService,
    private readonly api: AccountsService,
    private readonly serviceLocationApi: ServiceLocationApiService,
    private readonly masterLocationApi: MasterLocationApiService,
    private readonly servicePriceApi: PricesApiService,
    private readonly servicePublishDataFormatter: ServicePublishDataPreparerService,
    private readonly masterScheduleApi: MasterScheduleApiService,
  ) {
  }

  public publish(): Observable<Service> {
    return from(this.servicePublishDataFormatter.getData()).pipe(
      switchMap(data => this.processData(data)),
      finalize(() => this.servicePublishDataHolder.reset()),
    );
  }

  private processData({
                        master,
                        service,
                        servicePhotos,
                        serviceSchedule,
                        masterSchedule,
                        serviceLocation,
                        masterLocation,
                        servicePrice,
                        user,
                      }: ServicePublishData): Observable<Service> {
    let createdService: Service;
    let createdMaster: ProfessionalList;

    return this.createMasterUpdateUser(master, user).pipe(
      switchMap((reply) => {
        createdMaster = reply;

        return this.createService(service, createdMaster);
      }),
      switchMap(reply => {
        createdService = reply;

        return forkJoin({
          photosRet: this.createPhotos(servicePhotos, createdService),
          scheduleRet: this.createSchedule(serviceSchedule, createdService),
          masterScheduleRet: this.createMasterSchedule(masterSchedule, createdMaster),
          masterLocRet: masterLocation
            ? (!masterLocation.id ? this.createMasterLocation(masterLocation, createdMaster) : of(masterLocation))
            : of<MasterLocation>(null),
          priceRet: this.createPrice(servicePrice, createdService),
        });
      }),
      switchMap(({ masterLocRet }) => (serviceLocation && masterLocRet)
        ? this.createServiceLocation(serviceLocation, createdService, masterLocRet)
        : of(null)),
      map(() => createdService),
    );
  }

  private createMasterUpdateUser(master: ProfessionalList, user?: User): Observable<ProfessionalList> {
    if (master.id) {
      return of(master);
    }

    return forkJoin({
      updatedUser: user ? this.userManager.updateUser(user) : of(null),
      createdMaster: this.masterManager.createMaster(master),
    }).pipe(
      map(({ createdMaster }) => createdMaster),
    );
  }

  private createService(service: Service, master: ProfessionalList): Observable<Service> {
    return this.serviceApi.create({ ...service, professional: master.id });
  }

  private createPhotos(photos: ServicePhoto[], service: Service): Observable<ServicePhoto[]> {
    photos.forEach(photo => photo.service = service.id);

    return this.servicePhotosApi.createList(photos);
  }

  private createSchedule(schedule: ServiceSchedule[], service: Service): Observable<ServiceSchedule[]> {
    // TODO: remove explicit casting when swagger is fixed
    const data = schedule?.map(v => ({ ...v, service: service.id })) as unknown as ServiceSchedule;
    return this.api.accountsServiceScheduleSet(data) as unknown as Observable<ServiceSchedule[]>;
  }

  private createMasterSchedule(schedule: MasterSchedule[], master: ProfessionalList): Observable<MasterSchedule[]> {
    return this.masterScheduleApi.createSet(schedule?.map(v => ({ ...v, professional: master.id })));
  }

  private createMasterLocation(location: MasterLocation, master: ProfessionalList): Observable<MasterLocation> {
    return this.masterLocationApi.create({ ...location, professional: master.id });
  }

  private createPrice(price: Price, service: Service): Observable<Price> {
    return this.servicePriceApi.create({ ...price, service: service.id });
  }

  private createServiceLocation(location: ServiceLocation, service: Service, masterLoc: MasterLocation): Observable<ServiceLocation> {
    return this.serviceLocationApi.create({ ...location, location: masterLoc.id, service: service.id });
  }
}
