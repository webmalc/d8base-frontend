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

    public getStepData<T>(step: number): T {
        // @ts-ignore
        return this.stepsData[step] as T;
    }

    public removeStep(fromStep: number): void {
        for (let i = fromStep; i < this.stepsNumber; i += 1) {
            this.stepsData[i] = undefined;
        }
    }

    public isset(step: number): boolean {
        return this.stepsData[step] !== undefined;
    }

    public reset(): void {
        this.stepsData = [];
    }

    public getFullData(): object[] {
        return this.stepsData;
    }
}
