import {Injectable} from '@angular/core';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {HelperService} from '@app/core/services/helper.service';
import {MasterLocation} from '@app/master/models/master-location';
import {TypeOfUser} from '@app/profile/enums/type-of-user';
import {ServicePublishFinalStepComponent} from '@app/service/components/service-publish-final-step/service-publish-final-step.component';
import {ServicePublishStepFiveComponent} from '@app/service/components/service-publish-step-five/service-publish-step-five.component';
import {ServicePublishStepFourComponent} from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import {ServicePublishStepOneComponent} from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import {ServicePublishStepSevenComponent} from '@app/service/components/service-publish-step-seven/service-publish-step-seven.component';
import {ServicePublishStepSixComponent} from '@app/service/components/service-publish-step-six/service-publish-step-six.component';
import {ServicePublishStepThreeComponent} from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import {ServicePublishStepTwoComponent} from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import {PaymentMethods} from '@app/service/enums/payment-methods';
import {FinalStepDataInterface} from '@app/service/interfaces/final-step-data-interface';
import {StepFiveDataInterface} from '@app/service/interfaces/step-five-data-interface';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
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
import {plainToClass} from 'class-transformer';

@Injectable()
export class ServicePublishDataPreparerService {

    constructor(private servicePublishDataHolder: ServicePublishDataHolderService) {
    }

    public async getData(): Promise<{
        master: Master,
        user: User,
        service: Service,
        servicePhotos: ServicePhoto[],
        serviceSchedule: ServiceSchedule[],
        serviceLocation: ServiceLocation,
        masterLocation: MasterLocation,
        servicePrice: Price
    }> {
        return {
            master: this.getMaster(),
            user: await this.getUser(),
            service: this.getService(),
            servicePhotos: await this.getServicePhotos(),
            serviceSchedule: this.getServiceSchedule(),
            serviceLocation: this.getServiceLocation(),
            masterLocation: this.getMasterLocation(),
            servicePrice: this.getServicePrice()
        };
    }

    private getServiceSchedule(): ServiceSchedule[] {
        const stepData: ServiceSchedule[] = HelperService.clearArray(this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(
            ServicePublishStepSevenComponent.STEP
        )?.timetable?.map(
            raw => plainToClass(ServiceSchedule, raw)
        ));

        return !stepData ? [] : stepData;
    }

    private async getServicePhotos(): Promise<ServicePhoto[]> {
        const data = this.servicePublishDataHolder.getStepData<StepThreeDataInterface>(ServicePublishStepThreeComponent.STEP);

        return HelperService.clearArray(await this.generateServicePhotos(data));
    }

    private getService(): Service {
        const stepData = this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishStepTwoComponent.STEP);
        const service = plainToClass(Service, stepData, {excludeExtraneousValues: true});
        service.duration = this.getDuration(stepData);

        return HelperService.clear(service);
    }

    private async getUser(): Promise<User | null> {
        if (this.servicePublishDataHolder.isset(ServicePublishStepFourComponent.STEP) &&
            !this.servicePublishDataHolder.getStepData<StepFourDataInterface>(ServicePublishStepFourComponent.STEP).isNewUser) {
            return null;
        }
        const stepData = this.servicePublishDataHolder.getStepData<StepFiveDataInterface>(ServicePublishStepFiveComponent.STEP);
        const user = new User();
        user.first_name = stepData.first_name;
        user.last_name = stepData.last_name;
        user.gender = stepData.gender;
        if (stepData._avatar) {
            user.avatar = await HelperService.getImgBase64(stepData._avatar);
        }
        user.account_type = TypeOfUser.Master;

        return HelperService.clear(user);
    }

    private getMaster(): Master {
        if (!this.servicePublishDataHolder.getStepData<StepFourDataInterface>(ServicePublishStepFourComponent.STEP).isNewMaster &&
            this.servicePublishDataHolder.isset(ServicePublishFinalStepComponent.STEP)
        ) {
            return this.servicePublishDataHolder.getStepData<FinalStepDataInterface>(ServicePublishFinalStepComponent.STEP).master;
        }
        const master = new Master();
        const stepOneData = this.servicePublishDataHolder.getStepData<StepOneDataInterface>(ServicePublishStepOneComponent.STEP);
        const stepSixData = this.servicePublishDataHolder.getStepData<StepSixDataInterface>(ServicePublishStepSixComponent.STEP);
        master.subcategory = stepOneData.subcategory.id;
        master.company = stepSixData?.company_name;
        master.description = stepSixData?.description;
        master.name = stepSixData?.name;
        master.level = stepSixData?.level;

        return HelperService.clear(master);
    }

    private getMasterLocation(): MasterLocation {
        if (this.servicePublishDataHolder.isset(ServicePublishFinalStepComponent.STEP) &&
            this.servicePublishDataHolder.getStepData<FinalStepDataInterface>(ServicePublishFinalStepComponent.STEP).masterLocation) {
            return this.servicePublishDataHolder.getStepData<FinalStepDataInterface>(ServicePublishFinalStepComponent.STEP).masterLocation;
        }
        const location = new MasterLocation();
        const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishStepSevenComponent.STEP);
        location.country = stepData.country.id;
        location.city = stepData.city.id;
        location.address = stepData?.address;
        location.postal_code = stepData?.postal_code?.id;
        location.units = parseInt(stepData.departure.units, 10);

        return HelperService.clear(location);
    }

    private getServiceLocation(): ServiceLocation {
        const location = new ServiceLocation();
        const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishStepSevenComponent.STEP);
        location.max_distance = stepData.departure.max_distance;

        return HelperService.clear(location);
    }

    private getServicePrice(): Price {
        const price = new Price();
        price.payment_methods = [];
        const stepTwoData = this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishStepTwoComponent.STEP);
        const stepSevenData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishStepSevenComponent.STEP);
        if (stepSevenData.payment_cash) {
            price.payment_methods.push(PaymentMethods.Cash);
        }
        if (stepSevenData.payment_online) {
            price.payment_methods.push(PaymentMethods.Online);
        }
        price.price = stepTwoData.price;
        price.start_price = stepTwoData.start_price;
        price.end_price = stepTwoData.end_price;
        price.end_price_currency = stepTwoData.end_price_currency?.currency;
        price.start_price_currency = stepTwoData.start_price_currency?.currency;
        price.price_currency = stepTwoData.price_currency?.currency;
        price.is_price_fixed = stepTwoData.is_price_fixed;

        return HelperService.clear(price);
    }

    private async generateServicePhotos(data: StepThreeDataInterface): Promise<ServicePhoto[]> {
        return await Promise.all([...data.photos.map(async val => this.getNewPhoto(await HelperService.getImgBase64(val)))]);
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
