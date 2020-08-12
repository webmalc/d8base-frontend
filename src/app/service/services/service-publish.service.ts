import {Injectable} from '@angular/core';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {HelperService} from '@app/core/services/helper.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {TypeOfUser} from '@app/profile/enums/type-of-user';
import {StepFiveDataInterface} from '@app/service/interfaces/step-five-data-interface';
import {StepOneDataInterface} from '@app/service/interfaces/step-one-data-interface';
import {StepSevenDataInterface} from '@app/service/interfaces/step-seven-data-interface';
import {StepSixDataInterface} from '@app/service/interfaces/step-six-data-interface';
import {StepThreeDataInterface} from '@app/service/interfaces/step-three-data-interface';
import {StepTwoDataInterface} from '@app/service/interfaces/step-two-data-interface';
import {Price} from '@app/service/models/price';
import {Service} from '@app/service/models/service';
import {ServiceLocation} from '@app/service/models/service-location';
import {ServicePhoto} from '@app/service/models/service-photo';
import {ServiceSchedule} from '@app/service/models/service-schedule';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {MasterLocation} from '@app/master/models/master-location';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {ServicePhotoApiService} from '@app/service/services/service-photo-api.service';
import {ServiceScheduleApiService} from '@app/service/services/service-schedule-api.service';
import {ServiceLocationApiService} from '@app/service/services/service-location-api.service';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {forkJoin, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class ServicePublishService {

    constructor(
        private servicePublishDataHolder: ServicePublishDataHolderService,
        private masterManager: MasterManagerService,
        private userManager: UserManagerService,
        private serviceApi: ServicesApiService,
        private servicePhotosApi: ServicePhotoApiService,
        private serviceScheduleApi: ServiceScheduleApiService,
        private serviceLocationApi: ServiceLocationApiService,
        private masterLocationApi: MasterLocationApiService
    ) {
    }

    public publish(): void {
        this.prepare().then(
            data => this.processData(
                data.user, data.master, data.service, data.servicePhotos, data.serviceSchedule, data.serviceLocation, data.masterLocation
            ).subscribe()
        );
    }

    private processData(
        user: User,
        master: Master,
        service: Service,
        photos: ServicePhoto[],
        schedule: ServiceSchedule[],
        serviceLocation: ServiceLocation,
        masterLocation: MasterLocation
    ): Observable<any> {
        return forkJoin({
            userRet: this.userManager.updateUser(user),
            masterRet: this.masterManager.createMaster(master)
        }).pipe(
            switchMap(
                ({userRet, masterRet}) => {
                    return this.serviceApi.create(service).pipe(
                        switchMap(serviceRet => {
                            photos.forEach(photo => photo.service = serviceRet.id);
                            schedule.forEach(v => v.service = serviceRet.id);
                            serviceLocation.service = serviceRet.id;
                            masterLocation.professional = masterRet.id;

                            return forkJoin([
                                this.servicePhotosApi.createList(photos),
                                this.serviceScheduleApi.createList(schedule),
                                this.serviceLocationApi.create(serviceLocation),
                                this.masterLocationApi.create(masterLocation)
                            ]);
                        })
                    );
                }
            )
        );
    }

    private async prepare(): Promise<{
        master: Master,
        user: User,
        service: Service,
        servicePhotos: ServicePhoto[],
        serviceSchedule: ServiceSchedule[],
        serviceLocation: ServiceLocation,
        masterLocation: MasterLocation
    }> {
        const master = new Master();
        const user = new User();
        const service = new Service();
        let servicePhotos: ServicePhoto[];
        let serviceSchedule: ServiceSchedule[];
        const serviceLocation = new ServiceLocation();
        const masterLocation: MasterLocation = new MasterLocation();

        this.prepareFirstStepData(master);
        this.prepareSecondStep(service);
        servicePhotos = await this.prepareThirdStep();
        await this.prepareFifthStep(user, master);
        this.prepareSixthStep(master);
        serviceSchedule = this.generateServiceSchedule();
        this.generateServiceLocation(serviceLocation);
        this.prepareSeventhStep(service);
        this.generateMasterLocation(masterLocation);
        service.price = HelperService.clear(service.price);

        console.log(HelperService.clear(master));
        console.log(HelperService.clear(user));
        console.log(HelperService.clear(service));
        console.log(HelperService.clearArray(servicePhotos));
        console.log(HelperService.clearArray(serviceSchedule));
        console.log(HelperService.clear(serviceLocation));
        console.log(HelperService.clear(masterLocation));

        return {
            master: HelperService.clear(master),
            user: HelperService.clear(user),
            service: HelperService.clear(service),
            servicePhotos: HelperService.clearArray(servicePhotos),
            serviceSchedule: HelperService.clearArray(serviceSchedule),
            serviceLocation: HelperService.clear(serviceLocation),
            masterLocation: HelperService.clear(masterLocation)
        };
    }

    private prepareFirstStepData(master: Master): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepOneDataInterface>(0);
        master.subcategory = stepData.subcategory.id;
    }

    private prepareSecondStep(service: Service): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(1);
        service = plainToClassFromExist(service, stepData, {excludeExtraneousValues: true});
        service.price = this.generateServicePrice(stepData);
    }

    private prepareThirdStep(): Promise<ServicePhoto[]> {
        return this.generateServicePhotos(this.servicePublishDataHolder.getStepData<StepThreeDataInterface>(2));
    }

    private async prepareFifthStep(user: User, master: Master): Promise<void> {
        const stepData = this.servicePublishDataHolder.getStepData<StepFiveDataInterface>(4);
        user = plainToClassFromExist(user, stepData, {excludeExtraneousValues: true, excludePrefixes: ['_']});
        if (stepData._avatar) {
            user.avatar = await HelperService.getImgBase64(stepData._avatar);
        }
        user.account_type = TypeOfUser.Master;
        master.company = stepData.company_name;

        return;
    }

    private prepareSixthStep(master: Master): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepSixDataInterface>(5);
        master.level = stepData.level;
        master.description = stepData.description;
        master.name = stepData.name;
    }

    private prepareSeventhStep(service: Service): void {
        service.price.payment_methods = [];
        const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(6);
        if (stepData.payment_cash) {
            service.price.payment_methods.push('cash');
        }
        if (stepData.payment_online) {
            service.price.payment_methods.push('online');
        }
    }

    private generateMasterLocation(location: MasterLocation): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(6);
        location.country = stepData.country.id;
        location.city = stepData.city.id;
        location.address = stepData.address;
        location.postal_code = stepData.postal_code;
    }

    private generateServiceLocation(location: ServiceLocation): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(6);
        location.max_distance = stepData.departure.max_distance;
    }

    private generateServiceSchedule(): ServiceSchedule[] {
        return this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(6).timetable.map(
            raw => plainToClass(ServiceSchedule, raw)
        );
    }

    private generateServicePrice(data: StepTwoDataInterface): Price {
        const price: Price = plainToClass(Price, data, {excludeExtraneousValues: true});
        price.end_price_currency = data.end_price_currency?.value;
        price.start_price_currency = data.start_price_currency?.value;
        price.price_currency = data.price_currency?.value;

        return price;
    }

    private async generateServicePhotos(data: StepThreeDataInterface): Promise<ServicePhoto[]> {
        return await Promise.all([...data.photos.map(async (val) => this.getNewPhoto(await HelperService.getImgBase64(val)))]);
    }

    private getNewPhoto(photo: string): ServicePhoto {
        return plainToClass(ServicePhoto, {photo}, {excludeExtraneousValues: true});
    }
}
