import { Injectable } from '@angular/core';

@Injectable()
export class ServicePublishService {

    private stepsData: object[] = [];
    private readonly stepsNumber = 7;

    constructor() {
        this.reset();
    }

    public setStepData(step: number, data: object): void {
        this.stepsData[step] = data;
    }

    public assignStepData(step: number, data: object): void {
        if (this.stepsData[step] === undefined) {
            this.stepsData[step] = {};
        }
        this.stepsData[step] = Object.assign(this.stepsData[step], data);
    }

    public getStepData<T>(step: number): T {
        // @ts-ignore
        return this.stepsData[step] as T;
    }

    public getPartialStepData<T>(step: number, data: string): T {
        return this.stepsData[step][data];
    }

    public removeSteps(fromStep: number): void {
        for (let i = fromStep; i < this.stepsNumber; i += 1) {
            this.stepsData[i] = undefined;
        }
    }

    public isset(step: number): boolean {
        return this.stepsData[step] !== undefined && this.stepsData[step] !==  {};
    }

    public issetStepPartialData(step: number, data: string): boolean {
        return this.setStepData[step] !== undefined && this.setStepData[step][data] !== undefined;
    }

    public reset(): void {
        this.stepsData = [];
    }

    public getFullData(): object[] {
        return this.stepsData;
    }
}
