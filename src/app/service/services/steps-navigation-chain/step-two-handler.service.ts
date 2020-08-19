import {Injectable} from '@angular/core';
import {ServicePublishStepTwoComponent} from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';

@Injectable()
export class StepTwoHandlerService extends AbstractHandler {

    constructor() {
        super();
    }

    public handle(): number {
        return this.getIndex();
    }

    protected getIndex(): number {
        return ServicePublishStepTwoComponent.STEP;
    }
}
