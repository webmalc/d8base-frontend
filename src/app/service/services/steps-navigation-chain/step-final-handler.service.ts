import {Injectable} from '@angular/core';
import {ServicePublishFinalStepComponent} from '@app/service/components/service-publish-final-step/service-publish-final-step.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';

@Injectable()
export class StepFinalHandlerService extends AbstractHandler {

    constructor() {
        super();
    }

    public handle(): number {
        return this.getIndex();
    }

    protected getIndex(): number {
        return ServicePublishFinalStepComponent.STEP;
    }
}
