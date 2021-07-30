import { Injectable } from '@angular/core';
import { ProfessionalLocation, ProfessionalSchedule, Service, ServicePhoto, ServiceSchedule } from '@app/api/models';
import { ProfessionalList } from '@app/api/models/professional-list';
import { AccountsService } from '@app/api/services/accounts.service';
import { fileToBase64 } from '@app/core/functions/media.functions';
import { removeNullProperties } from '@app/core/functions/object.functions';
import { PaymentMethods } from '@app/service/enums/payment-methods';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepOneDataInterface } from '@app/service/interfaces/step-one-data-interface';
import { StepSevenDataInterface } from '@app/service/interfaces/step-seven-data-interface';
import { StepSixDataInterface } from '@app/service/interfaces/step-six-data-interface';
import { StepThreeDataInterface } from '@app/service/interfaces/step-three-data-interface';
import { StepTwoDataInterface } from '@app/service/interfaces/step-two-data-interface';
import { Price } from '@app/service/models/price';
import { ServiceLocation } from '@app/service/models/service-location';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import ServicePublishData from '../interfaces/service-publish-data.interface';

@Injectable()
export class ServicePublishDataPreparerService {
  constructor(
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    private readonly api: AccountsService,
  ) {}

  public async getData(): Promise<ServicePublishData> {
    const service = this.getService();
    const serviceLocation = service.service_type !== 'online' ? this.getServiceLocation() : null;
    const masterLocation = service.service_type !== 'online' ? await this.getMasterLocation() : null;

    return {
      service,
      serviceLocation,
      masterLocation,
      master: this.getNewMaster(),
      servicePhotos: await this.getServicePhotos(),
      serviceSchedule: this.getServiceSchedule(),
      masterSchedule: this.getProfessionalSchedule(),
      servicePrice: this.getServicePrice(),
    };
  }

  private getProfessionalSchedule(): ProfessionalSchedule[] | null {
    const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    return stepData.need_to_create_master_schedule
      ? stepData?.timetable?.map(s => ({ ...s, professional: NaN })) ?? []
      : null;
  }

  private getServiceSchedule(): ServiceSchedule[] | null {
    const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    return stepData.use_master_schedule ? null : stepData?.timetable?.map(s => ({ ...s, service: NaN })) ?? [];
  }

  private async getServicePhotos(): Promise<ServicePhoto[]> {
    const data = this.servicePublishDataHolder.getStepData<StepThreeDataInterface>(ServicePublishSteps.Three);
    return await this.generateServicePhotos(data);
  }

  private getService(): Omit<Service, 'professional'> {
    const stepTwoData = this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two);
    const stepSevenData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    const service = {
      ...stepTwoData,
      is_base_schedule: stepSevenData.use_master_schedule || stepSevenData.need_to_create_master_schedule,
      is_auto_order_confirmation: stepSevenData.is_auto_order_confirmation ?? false,
      is_enabled: true, // always create already published service; the owner can un-publish it later
    };

    return removeNullProperties(service);
  }

  private getNewMaster(): ProfessionalList {
    const stepOneData = this.servicePublishDataHolder.getStepData<StepOneDataInterface>(ServicePublishSteps.One);
    const stepSixData = this.servicePublishDataHolder.getStepData<StepSixDataInterface>(ServicePublishSteps.Six);

    return !this.servicePublishDataHolder.isset(ServicePublishSteps.Five)
      ? null
      : {
          subcategory: stepOneData.subcategory.id,
          company: stepSixData?.is_company === 'company' ? stepSixData?.company_name : null,
          description: stepSixData?.description,
          name: stepSixData?.name,
          level: stepSixData?.level,
        };
  }

  private async getMasterLocation(): Promise<ProfessionalLocation> {
    const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    if (stepData.use_default_location && stepData.default_location) {
      const id = stepData.default_location;
      return this.api.accountsProfessionalLocationsRead(id).toPromise();
    }
    const location: ProfessionalLocation = {
      country: stepData.country.id,
      city: stepData.city.id,
      address: stepData?.address,
      postal_code: stepData?.postal_code?.id,
      professional: null, // not created yet
    };
    if (stepData.units) {
      location.units = stepData.units === '1' ? 1 : 0;
    }

    return location;
  }

  private getServiceLocation(): ServiceLocation {
    const location = new ServiceLocation();
    const stepData = this.servicePublishDataHolder.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    location.max_distance = stepData?.max_distance;

    return removeNullProperties(location);
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
      payment_methods: price.payment_methods,
    };

    return removeNullProperties(price);
  }

  private async generateServicePhotos(data: StepThreeDataInterface): Promise<ServicePhoto[]> {
    return await Promise.all([...data.photos.map(async val => ({ service: null, photo: await fileToBase64(val) }))]);
  }
}
