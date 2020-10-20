import {Injectable} from '@angular/core';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterLocation} from '@app/master/models/master-location';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {Price} from '@app/service/models/price';
import {Service} from '@app/service/models/service';
import {ServiceLocation} from '@app/service/models/service-location';
import {ServicePhoto} from '@app/service/models/service-photo';
import {ServiceSchedule} from '@app/service/models/service-schedule';
import {PricesApiService} from '@app/service/services/prices-api.service';
import {ServiceLocationApiService} from '@app/service/services/service-location-api.service';
import {ServicePhotoApiService} from '@app/service/services/service-photo-api.service';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServicePublishDataPreparerService} from '@app/service/services/service-publish-data-preparer.service';
import {ServiceScheduleApiService} from '@app/service/services/service-schedule-api.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {forkJoin, from, Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class ServicePublishService {

    constructor(
        private readonly servicePublishDataHolder: ServicePublishDataHolderService,
        private readonly masterManager: MasterManagerService,
        private readonly userManager: UserManagerService,
        private readonly serviceApi: ServicesApiService,
        private readonly servicePhotosApi: ServicePhotoApiService,
        private readonly serviceScheduleApi: ServiceScheduleApiService,
        private readonly serviceLocationApi: ServiceLocationApiService,
        private readonly masterLocationApi: MasterLocationApiService,
        private readonly servicePriceApi: PricesApiService,
        private readonly servicePublishDataFormatter: ServicePublishDataPreparerService
    ) {
    }

    public publish(): Observable<void> {
        return from(this.servicePublishDataFormatter.getData()).pipe(
            switchMap(data => this.processData(
                data.master,
                data.service,
                data.servicePhotos,
                data.serviceSchedule,
                data.serviceLocation,
                data.masterLocation,
                data.servicePrice,
                data.user
            ).pipe(
                tap(() => this.servicePublishDataHolder.reset())
            ))
        );
    }

    private processData(
        master: Master,
        service: Service,
        photos: ServicePhoto[],
        schedule: ServiceSchedule[],
        serviceLocation: ServiceLocation,
        masterLocation: MasterLocation,
        price: Price,
        user?: User
    ): Observable<any> {
        return this.createMasterUpdateUser(master, user).pipe(
            switchMap(
                (createdMaster) => this.createService(service, createdMaster).pipe(
                    switchMap(createdService => forkJoin({
                        photosRet: this.createPhotos(photos, createdService),
                        scheduleRet: this.createSchedule(schedule, createdService),
                        masterLocRet: !masterLocation.id ? this.createMasterLocation(masterLocation, createdMaster) : of(masterLocation),
                        priceRet: this.createPrice(price, createdService)
                    }).pipe(
                        switchMap(({masterLocRet}) => this.createServiceLocation(serviceLocation, createdService, masterLocRet))
                    ))
                )
            )
        );
    }

    private createMasterUpdateUser(master: Master, user?: User): Observable<Master> {
        if (master.id) {
            return of(master);
        }

        return forkJoin({
            updatedUser: user ? this.userManager.updateUser(user) : of(null),
            createdMaster: this.masterManager.createMaster(master)
        }).pipe(
            map(({createdMaster}) => createdMaster)
        );
    }

    private createService(service: Service, master: Master): Observable<Service> {
        service.professional = master.id;

        return this.serviceApi.create(service);
    }

    private createPhotos(photos: ServicePhoto[], service: Service): Observable<ServicePhoto[]> {
        photos.forEach(photo => photo.service = service.id);

        return this.servicePhotosApi.createList(photos);
    }

    private createSchedule(schedule: ServiceSchedule[], service: Service): Observable<ServiceSchedule[]> {
        schedule?.forEach(v => v.service = service.id);

        return this.serviceScheduleApi.createList(schedule);
    }

    private createMasterLocation(location: MasterLocation, master: Master): Observable<MasterLocation> {
        location.professional = master.id;

        return this.masterLocationApi.create(location);
    }

    private createPrice(price: Price, service: Service): Observable<Price> {
        price.service = service.id;

        return this.servicePriceApi.create(price);
    }

    private createServiceLocation(location: ServiceLocation, service: Service, masterLoc: MasterLocation): Observable<ServiceLocation> {
        location.location = masterLoc.id;
        location.service = service.id;

        return this.serviceLocationApi.create(location);
    }
}
