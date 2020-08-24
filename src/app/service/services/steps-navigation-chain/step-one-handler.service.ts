import {Injectable} from '@angular/core';
import {ServicePublishStepOneComponent} from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';
import {Observable, of} from 'rxjs';

@Injectable()
export class StepOneHandlerService extends AbstractHandler {

    constructor() {
        super();
    }

    public handleNext(): Observable<number> {
        return of(this.getIndex());
    }

    public handlePrevious(): Observable<number> {
        return of(this.getIndex());
    }

    public getIndex(): number {
        return ServicePublishStepOneComponent.STEP;
    }
}
