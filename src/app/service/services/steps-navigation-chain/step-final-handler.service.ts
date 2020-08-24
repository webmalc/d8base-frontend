import {Injectable} from '@angular/core';
import {ServicePublishFinalStepComponent} from '@app/service/components/service-publish-final-step/service-publish-final-step.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';
import {Observable, of} from 'rxjs';

@Injectable()
export class StepFinalHandlerService extends AbstractHandler {

    constructor() {
        super();
    }

    public handleNext(): Observable<number> {
        return of(this.getIndex());
    }

    public handlePrevious(): Observable<number> {
        return of(this.getIndex());
    }

    protected getIndex(): number {
        return ServicePublishFinalStepComponent.STEP;
    }
}
