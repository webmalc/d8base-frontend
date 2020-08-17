import {Injectable} from '@angular/core';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {HelperService} from '@app/core/services/helper.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterLocation} from '@app/master/models/master-location';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
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
import {PricesApiService} from '@app/service/services/prices-api.service';
import {ServiceLocationApiService} from '@app/service/services/service-location-api.service';
import {ServicePhotoApiService} from '@app/service/services/service-photo-api.service';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceScheduleApiService} from '@app/service/services/service-schedule-api.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
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
        private masterLocationApi: MasterLocationApiService,
        private servicePriceApi: PricesApiService
    ) {
    }

    public publish(): void {
        this.prepare().then(
            data => this.processData(
                data.user,
                data.master,
                data.service,
                data.servicePhotos,
                data.serviceSchedule,
                data.serviceLocation,
                data.masterLocation,
                data.servicePrice
            ).subscribe(
                () => this.servicePublishDataHolder.reset()
            )
        );
    }

    private processData(
        user: User,
        master: Master,
        service: Service,
        photos: ServicePhoto[],
        schedule: ServiceSchedule[],
        serviceLocation: ServiceLocation,
        masterLocation: MasterLocation,
        price: Price
    ): Observable<any> {
        return forkJoin({
            userRet: this.userManager.updateUser(user),
            masterRet: this.masterManager.createMaster(master)
        }).pipe(
            switchMap(
                ({userRet, masterRet}) => {
                    service.professional = masterRet.id;

                    return this.serviceApi.create(service).pipe(
                        switchMap(serviceRet => {
                            photos.forEach(photo => photo.service = serviceRet.id);
                            schedule.forEach(v => v.service = serviceRet.id);
                            serviceLocation.service = serviceRet.id;
                            masterLocation.professional = masterRet.id;
                            price.service = serviceRet.id;

                            return forkJoin({
                                photosRet: this.servicePhotosApi.createList(photos),
                                scheduleRet: this.serviceScheduleApi.createList(schedule),
                                masterLocationRet: this.masterLocationApi.create(masterLocation as MasterLocation),
                                priceRet: this.servicePriceApi.create(price)
                            }).pipe(
                                switchMap(({photosRet, scheduleRet, masterLocationRet}) => {
                                    serviceLocation.location = masterLocationRet.id;

                                    return this.serviceLocationApi.create(serviceLocation);
                                })
                            );
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
        masterLocation: MasterLocation,
        servicePrice: Price
    }> {
        const master = new Master();
        const user = new User();
        const service = new Service();
        let servicePhotos: ServicePhoto[];
        let serviceSchedule: ServiceSchedule[];
        const serviceLocation = new ServiceLocation();
        const masterLocation: MasterLocation = new MasterLocation();
        const price: Price = new Price();

        this.prepareFirstStepData(master);
        this.prepareSecondStep(service);
        servicePhotos = await this.prepareThirdStep();
        await this.prepareFifthStep(user, master);
        this.prepareSixthStep(master);
        serviceSchedule = this.generateServiceSchedule();
        this.generateServiceLocation(serviceLocation);
        this.prepareSeventhStep(price);
        this.generateMasterLocation(masterLocation);
        this.generateServicePrice(price);

        return {
            master: HelperService.clear(master),
            user: HelperService.clear(user),
            service: HelperService.clear(service),
            servicePhotos: HelperService.clearArray(servicePhotos),
            serviceSchedule: HelperService.clearArray(serviceSchedule),
            serviceLocation: HelperService.clear(serviceLocation),
            masterLocation: HelperService.clear(masterLocation),
            servicePrice: HelperService.clear(price)
        };
    }

    private prepareFirstStepData(master: Master): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepOneDataInterface>(0);
        master.subcategory = stepData.subcategory.id;
    }

    private prepareSecondStep(service: Service): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(1);
        service = plainToClassFromExist(service, stepData, {excludeExtraneousValues: true});
        service.duration = this.getDuration(stepData);
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

    private prepareSeventhStep(price: Price): void {
        price.payment_methods = [];
        const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(6);
        if (stepData.payment_cash) {
            price.payment_methods.push('cash');
        }
        if (stepData.payment_online) {
            price.payment_methods.push('online');
        }
    }

    private generateMasterLocation(location: MasterLocation): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(6);
        location.country = stepData.country.id;
        location.city = stepData.city.id;
        location.address = stepData.address;
        location.postal_code = stepData.postal_code.id;
        location.units = parseInt(stepData.departure.units, 10);
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

    private generateServicePrice(price: Price): void {
        const stepData = this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(1);
        price.price = stepData.price;
        price.start_price = stepData.start_price;
        price.end_price = stepData.end_price;
        price.end_price_currency = stepData.end_price_currency?.currency;
        price.start_price_currency = stepData.start_price_currency?.currency;
        price.price_currency = stepData.price_currency?.currency;
        price.is_price_fixed = stepData.is_price_fixed;
    }

    private async generateServicePhotos(data: StepThreeDataInterface): Promise<ServicePhoto[]> {
        return await Promise.all([...data.photos.map(async (val) => this.getNewPhoto(await HelperService.getImgBase64(val)))]);
    }

    private getNewPhoto(photo: string): ServicePhoto {
        return plainToClass(ServicePhoto, {photo}, {excludeExtraneousValues: true});
    }

    private getDuration(data: StepTwoDataInterface): number {
        return this.conventDuration(data.duration_first_name, data.duration_first) +
            this.conventDuration(data.duration_second_name, data.duration_second);
    }

    private conventDuration(name: string, val: number): number {
        switch (name) {
            case 'days':
                return val * 1440;
            case 'hours':
                return val * 60;
            case 'minutes':
                return val;
            default:
                return 0;
        }
    }
}
