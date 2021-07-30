import { Injectable } from '@angular/core';
import {
  Price,
  ProfessionalLocation,
  ProfessionalSchedule,
  Service,
  ServiceList,
  ServiceLocation,
  ServicePhoto,
  ServiceSchedule,
} from '@app/api/models';
import { ProfessionalList } from '@app/api/models/professional-list';
import { AccountsService } from '@app/api/services';
import { MasterManagerService } from '@app/core/services/managers/master-manager.service';
import { MasterLocationApiService } from '@app/master/services/master-location-api.service';
import ServicePublishData from '@app/service/interfaces/service-publish-data.interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from '@app/service/services/service-publish-data-preparer.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { forkJoin, from, Observable, of } from 'rxjs';
import { finalize, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class ServicePublishService {
  @Select(CurrentUserSelectors.defaultProfessional)
  public professional$: Observable<ProfessionalList>;

  constructor(
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    private readonly masterManager: MasterManagerService,
    private readonly accountsApi: AccountsService,
    private readonly api: AccountsService,
    private readonly masterLocationApi: MasterLocationApiService,
    private readonly servicePublishDataFormatter: ServicePublishDataPreparerService,
  ) {}

  public publish(): Observable<ServiceList> {
    return from(this.servicePublishDataFormatter.getData()).pipe(
      switchMap(data => this.createEntities(data)),
      finalize(() => this.servicePublishDataHolder.reset()),
    );
  }

  private createEntities({
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
          scheduleRet: this.createServiceSchedule(serviceSchedule, createdService),
          masterScheduleRet: this.createMasterSchedule(masterSchedule, createdMaster),
          masterLocRet: masterLocation
            ? !masterLocation.id
              ? this.createMasterLocation(masterLocation, createdMaster)
              : of(masterLocation)
            : of<ProfessionalLocation>(null),
          priceRet: this.createPrice(servicePrice, createdService),
        });
      }),
      switchMap(({ masterLocRet }) =>
        serviceLocation && masterLocRet
          ? this.createServiceLocation(serviceLocation, createdService, masterLocRet)
          : of(null),
      ),
      map(() => createdService),
    );
  }

  private createService(service: Omit<Service, 'professional'>, master: ProfessionalList): Observable<Service> {
    return this.accountsApi.accountsServicesCreate({ ...service, professional: master.id });
  }

  private createPhotos(photos: ServicePhoto[], service: ServiceList): Observable<ServicePhoto[]> {
    if (!photos.length) {
      return of([]);
    }
    photos.forEach(photo => (photo.service = service.id));
    return forkJoin(photos.map(photo => this.api.accountsServicePhotosCreate(photo)));
  }

  private createServiceSchedule(schedule: ServiceSchedule[], service: ServiceList): Observable<ServiceSchedule[]> {
    if (!schedule?.length) {
      return of([]);
    }
    return this.api.accountsServiceScheduleSet(schedule?.map(v => ({ ...v, service: service.id })));
  }

  private createMasterSchedule(
    schedule: ProfessionalSchedule[],
    master: ProfessionalList,
  ): Observable<ProfessionalSchedule[]> {
    if (!schedule?.length) {
      return of([]);
    }
    return this.api.accountsProfessionalScheduleSet(schedule?.map(v => ({ ...v, professional: master.id })));
  }

  private createMasterLocation(
    location: ProfessionalLocation,
    master: ProfessionalList,
  ): Observable<ProfessionalLocation> {
    return this.api.accountsProfessionalLocationsCreate({ ...location, professional: master.id });
  }

  private createPrice(price: Price, service: ServiceList): Observable<Price> {
    return this.accountsApi.accountsServicePricesCreate({ ...price, service: service.id });
  }

  private createServiceLocation(
    location: ServiceLocation,
    service: ServiceList,
    masterLoc: ProfessionalLocation,
  ): Observable<ServiceLocation> {
    return this.accountsApi.accountsServiceLocationsCreate({
      ...location,
      location: masterLoc.id,
      service: service.id,
    });
  }
}
