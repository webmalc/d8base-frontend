import { Injectable } from '@angular/core';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { FinalStepDataInterface } from '@app/service/interfaces/final-step-data-interface';
import { StepFiveDataInterface } from '@app/service/interfaces/step-five-data-interface';
import { StepFourDataInterface } from '@app/service/interfaces/step-four-data-interface';
import { StepOneDataInterface } from '@app/service/interfaces/step-one-data-interface';
import { StepSevenDataInterface } from '@app/service/interfaces/step-seven-data-interface';
import { StepSixDataInterface } from '@app/service/interfaces/step-six-data-interface';
import { StepThreeDataInterface } from '@app/service/interfaces/step-three-data-interface';
import { StepTwoDataInterface } from '@app/service/interfaces/step-two-data-interface';
import { StepDataInterfaceType } from '@app/service/types/step-data-interface-type';

@Injectable({
  providedIn: 'root',
})
export class ServicePublishDataHolderService {

  private stepsData: {
    0?: StepOneDataInterface,
    1?: StepTwoDataInterface,
    2?: StepThreeDataInterface,
    3?: StepFourDataInterface,
    4?: StepFiveDataInterface,
    5?: StepSixDataInterface,
    6?: StepSevenDataInterface,
    7?: FinalStepDataInterface,
  } = {};
  private readonly storageKey = 'service_publish_data';

  constructor(private readonly storageManager: StorageManagerService) {
    this.loadFromStorage();
  }

  public setStepData<T extends StepDataInterfaceType>(step: number, data: T): Promise<void> {
    this.stepsData[step] = data;

    return this.updateStorage();
  }

  public assignStepData(step: number, data: object): Promise<void> {
    if (!this.stepsData[step]) {
      this.stepsData[step] = {};
    }
    this.stepsData[step] = {
      ...this.stepsData[step],
      ...data,
    };

    return this.updateStorage();
  }

  public getStepData<T>(step: number): T {
    return this.stepsData[step];
  }

  public getPartialStepData<T>(step: number, data: string): T {
    try {
      return this.stepsData[step][data];
    } catch (e) {
      return undefined;
    }
  }

  public isset(step: number): boolean {
    return this.stepsData[step] !== undefined && this.stepsData[step] !== {};
  }

  public issetStepPartialData(step: number, data: string): boolean {
    return this.stepsData[step] !== undefined && this.stepsData[step][data] !== undefined;
  }

  public reset(): Promise<void> {
    this.stepsData = {};

    return this.storageManager.remove(this.storageKey);
  }

  public getFullData(): object {
    return this.stepsData;
  }

  private updateStorage(): Promise<void> {
    return this.storageManager.set(this.storageKey, this.stepsData);
  }

  private async loadFromStorage(): Promise<void> {
    const data = await this.storageManager.get(this.storageKey);
    if (data) {
      this.stepsData = data;
    }

    return;
  }
}
