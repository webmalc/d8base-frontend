import {Injectable} from '@angular/core';
import {ServicePublishStepOneComponent} from '@app/service/components/service-publish-step-one/service-publish-step-one.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';

@Injectable()
export class StepOneHandlerService extends AbstractHandler {

    constructor() {
        super();
    }

    public handle(): number {
        return this.getIndex();
    }

    protected getIndex(): number {
        return ServicePublishStepOneComponent.STEP;
    }
}
