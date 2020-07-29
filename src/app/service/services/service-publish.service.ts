import { Injectable } from '@angular/core';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';

@Injectable()
export class ServicePublishService {

    private stepsData: object[] = [];
    private readonly totalSteps = 6;
    private readonly storageKey = 'service_publish_data';

    constructor(private storageManager: StorageManagerService) {
        this.loadFromStorage();
    }

    public setStepData(step: number, data: object): void {
        this.stepsData[step] = data;
        this.updateStorage();
    }

    public assignStepData(step: number, data: object): void {
        if (this.stepsData[step] === undefined) {
            this.stepsData[step] = {};
        }
        this.stepsData[step] = Object.assign(this.stepsData[step], data);
        this.updateStorage();
    }

    public getStepData<T>(step: number): T {
        // @ts-ignore
        return this.stepsData[step];
    }

    public getPartialStepData<T>(step: number, data: string): T {
        return this.stepsData[step][data];
    }

    public removeStep(step: number): void {
        this.stepsData[step] = undefined;
    }

    public isset(step: number): boolean {
        return this.stepsData[step] !== undefined && this.stepsData[step] !==  {};
    }

    public issetStepPartialData(step: number, data: string): boolean {
        return this.stepsData[step] !== undefined && this.stepsData[step][data] !== undefined;
    }

    public reset(): void {
        this.stepsData = [];
    }

    public getFullData(): object[] {
        return this.stepsData;
    }

    private async updateStorage(): Promise<void> {
        return await this.storageManager.set(this.storageKey, this.stepsData);
    }

    private async loadFromStorage(): Promise<void> {
        const data = await this.storageManager.get(this.storageKey);
        if (data) {
            this.stepsData = data;
        }

        return;
    }
}
