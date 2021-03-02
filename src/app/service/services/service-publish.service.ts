import { Injectable } from '@angular/core';
import { Service, ServiceList, ServiceSchedule } from '@app/api/models';
import { ProfessionalList } from '@app/api/models/professional-list';
import { AccountsService } from '@app/api/services';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { PricesApiService } from '@app/core/services/prices-api.service';
import { ServiceLocationApiService } from '@app/core/services/service-location-api.service';
import { ServicePhotoApiService } from '@app/core/services/service-photo-api.service';
import { MasterLocation } from '@app/master/models/master-location';
import { MasterSchedule } from '@app/master/models/master-schedule';
import { MasterLocationApiService } from '@app/master/services/master-location-api.service';
import { MasterScheduleApiService } from '@app/master/services/master-schedule-api.service';
import ServicePublishData from '@app/service/interfaces/service-publish-data.interface';
import { Price } from '@app/service/models/price';
import { ServiceLocation } from '@app/service/models/service-location';
import { ServicePhoto } from '@app/service/models/service-photo';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from '@app/service/services/service-publish-data-preparer.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { forkJoin, from, Observable, of } from 'rxjs';
import { finalize, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class ServicePublishService {
  @Select(CurrentUserSelectors.professional)
  public professional$: Observable<ProfessionalList>;

  constructor(
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    private readonly masterManager: MasterManagerService,
    private readonly accountsApi: AccountsService,
    private readonly servicePhotosApi: ServicePhotoApiService,
    private readonly api: AccountsService,
    private readonly serviceLocationApi: ServiceLocationApiService,
    private readonly masterLocationApi: MasterLocationApiService,
    private readonly servicePriceApi: PricesApiService,
    private readonly servicePublishDataFormatter: ServicePublishDataPreparerService,
    private readonly masterScheduleApi: MasterScheduleApiService,
  ) {}

  public publish(): Observable<ServiceList> {
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
  }: ServicePublishData): Observable<ServiceList> {
    let createdService: ServiceList;
    let createdMaster: ProfessionalList;

    return this.professional$.pipe(
      tap(professional => {
        if (!professional) {
          this.masterManager.createMaster(master);
        }
      }),
      first(x => !!x),
      switchMap(master => {
        createdMaster = master;
        return this.createService(service, master);
      }),
      switchMap(reply => {
        createdService = reply;
        return forkJoin({
          photosRet: this.createPhotos(servicePhotos, createdService),
          scheduleRet: this.createSchedule(serviceSchedule, createdService),
          masterScheduleRet: this.createMasterSchedule(masterSchedule, createdMaster),
          masterLocRet: masterLocation
            ? !masterLocation.id
              ? this.createMasterLocation(masterLocation, createdMaster)
              : of(masterLocation)
            : of<MasterLocation>(null),
          priceRet: this.createPrice(servicePrice, createdService),
        });
      }),
      switchMap(({ masterLocRet }) =>
        serviceLocation && masterLocRet ? this.createServiceLocation(serviceLocation, createdService, masterLocRet) : of(null),
      ),
      map(() => createdService),
    );
  }

  private createService(service: Omit<Service, 'professional'>, master: ProfessionalList): Observable<Service> {
    return this.accountsApi.accountsServicesCreate({ ...service, professional: master.id });
  }

  private createPhotos(photos: ServicePhoto[], service: ServiceList): Observable<ServicePhoto[]> {
    photos.forEach(photo => (photo.service = service.id));
    return this.servicePhotosApi.createList(photos);
  }

  private createSchedule(schedule: ServiceSchedule[], service: ServiceList): Observable<ServiceSchedule[]> {
    const data = schedule?.map(v => ({ ...v, service: service.id }));
    return this.api.accountsServiceScheduleSet(data);
  }

  private createMasterSchedule(schedule: MasterSchedule[], master: ProfessionalList): Observable<MasterSchedule[]> {
    return this.masterScheduleApi.createSet(schedule?.map(v => ({ ...v, professional: master.id })));
  }

  private createMasterLocation(location: MasterLocation, master: ProfessionalList): Observable<MasterLocation> {
    return this.masterLocationApi.create({ ...location, professional: master.id });
  }

  private createPrice(price: Price, service: ServiceList): Observable<Price> {
    return this.servicePriceApi.create({ ...price, service: service.id });
  }

  private createServiceLocation(location: ServiceLocation, service: ServiceList, masterLoc: MasterLocation): Observable<ServiceLocation> {
    return this.serviceLocationApi.create({ ...location, location: masterLoc.id, service: service.id });
  }
}
