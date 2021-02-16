import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models/professional-list';
import { HelperService } from '@app/core/services/helper.service';
import { MasterLocation } from '@app/master/models/master-location';
import { MasterSchedule } from '@app/master/models/master-schedule';
import { PaymentMethods } from '@app/service/enums/payment-methods';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { FinalStepDataInterface } from '@app/service/interfaces/final-step-data-interface';
import { StepFiveDataInterface } from '@app/service/interfaces/step-five-data-interface';
import { StepOneDataInterface } from '@app/service/interfaces/step-one-data-interface';
import { StepSevenDataInterface } from '@app/service/interfaces/step-seven-data-interface';
import { StepSixDataInterface } from '@app/service/interfaces/step-six-data-interface';
import { StepThreeDataInterface } from '@app/service/interfaces/step-three-data-interface';
import { StepTwoDataInterface } from '@app/service/interfaces/step-two-data-interface';
import { Price } from '@app/service/models/price';
import { Service } from '@app/service/models/service';
import { ServiceLocation } from '@app/service/models/service-location';
import { ServicePhoto } from '@app/service/models/service-photo';
import { ServiceSchedule } from '@app/service/models/service-schedule';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { plainToClass } from 'class-transformer';
import ServicePublishData from '../interfaces/service-publish-data.interface';

@Injectable()
export class ServicePublishDataPreparerService {

  constructor(private readonly servicePublishDataHolder: ServicePublishDataHolderService) {
  }

  public async getData(): Promise<ServicePublishData> {
    const service = this.getService();
    const serviceLocation = service.service_type !== 'online' ? this.getServiceLocation() : null;
    const masterLocation = service.service_type !== 'online' ? this.getMasterLocation() : null;

    return {
      service,
      serviceLocation,
      masterLocation,
      master: this.getNewMaster(),
      servicePhotos: await this.getServicePhotos(),
      serviceSchedule: this.getServiceSchedule(),
      masterSchedule: this.getMasterSchedule(),
      servicePrice: this.getServicePrice(),
    };
  }

  private getMasterSchedule(): MasterSchedule[] {
    if (this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven).need_to_create_master_schedule) {
      const stepData: MasterSchedule[] = HelperService.clearArray(this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(
        ServicePublishSteps.Seven,
      )?.timetable?.map(
        raw => plainToClass(MasterSchedule, raw),
      ));

      return !stepData ? [] : stepData;
    }

    return [];
  }

  private getServiceSchedule(): ServiceSchedule[] {
    if (this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven).use_master_schedule) {
      return [];
    }
    const stepData: ServiceSchedule[] = HelperService.clearArray(this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(
      ServicePublishSteps.Seven,
    )?.timetable?.map(
      raw => plainToClass(ServiceSchedule, raw),
    ));

    return !stepData ? [] : stepData;
  }

  private async getServicePhotos(): Promise<ServicePhoto[]> {
    const data = this.servicePublishDataHolder.getStepData<StepThreeDataInterface>(ServicePublishSteps.Three);

    return HelperService.clearArray(await this.generateServicePhotos(data));
  }

  private getService(): Service {
    const stepTwoData = this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two);
    const stepSevenData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    const service = plainToClass(Service, stepTwoData, { excludeExtraneousValues: true });
    service.duration = stepTwoData.duration;
    service.is_base_schedule = stepSevenData.use_master_schedule || stepSevenData.need_to_create_master_schedule;
    service.is_auto_order_confirmation = stepSevenData.is_auto_order_confirmation ?? false;
    service.is_enabled = true; // always create already published service; the owner can un-publish it later

    return HelperService.clear(service);
  }

  private getNewMaster(): ProfessionalList {
    const stepOneData = this.servicePublishDataHolder.getStepData<StepOneDataInterface>(ServicePublishSteps.One);
    const stepFiveData = this.servicePublishDataHolder.getStepData<StepFiveDataInterface>(ServicePublishSteps.Five);
    const stepSixData = this.servicePublishDataHolder.getStepData<StepSixDataInterface>(ServicePublishSteps.Six);

    return !this.servicePublishDataHolder.isset(ServicePublishSteps.Five) ? null : {
      subcategory: stepOneData.subcategory.id,
      company: stepSixData?.is_company === 'company' ? stepSixData?.company_name : null,
      description: stepSixData?.description,
      name: stepSixData?.name || `${stepFiveData.first_name} ${stepFiveData.last_name}`,
      level: stepSixData?.level,
    };
  }

  private getMasterLocation(): MasterLocation {
    if (this.servicePublishDataHolder.isset(ServicePublishSteps.Final) &&
      this.servicePublishDataHolder.getStepData<FinalStepDataInterface>(ServicePublishSteps.Final).masterLocation) {
      return this.servicePublishDataHolder.getStepData<FinalStepDataInterface>(ServicePublishSteps.Final).masterLocation;
    }
    const location = new MasterLocation();
    const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    location.country = stepData.country.id;
    location.city = stepData.city.id;
    location.address = stepData?.address;
    location.postal_code = stepData?.postal_code?.id;
    if (stepData.units) {
      location.units = parseInt(stepData.units, 10);
    }

    return HelperService.clear(location);
  }

  private getServiceLocation(): ServiceLocation {
    const location = new ServiceLocation();
    const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    location.max_distance = stepData?.max_distance;

    return HelperService.clear(location);
  }

  private getServicePrice(): Price {
    let price = new Price();
    price.payment_methods = [];
    const stepTwoData = this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two);
    const stepSevenData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    if (stepSevenData.payment_cash) {
      price.payment_methods.push(PaymentMethods.Cash);
    }
    if (stepSevenData.payment_online) {
      price.payment_methods.push(PaymentMethods.Online);
    }
    price = {
      ...price,
      ...stepTwoData.price,
    };

    return HelperService.clear(price);
  }

  private async generateServicePhotos(data: StepThreeDataInterface): Promise<ServicePhoto[]> {
    return await Promise.all([...data.photos.map(async val => this.getNewPhoto(await HelperService.getImgBase64(val)))]);
  }

  private getNewPhoto(photo: string): ServicePhoto {
    return plainToClass(ServicePhoto, { photo }, { excludeExtraneousValues: true });
  }
}
