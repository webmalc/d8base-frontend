import {Injectable} from '@angular/core';
import {ServicePublishStepSevenComponent} from '@app/service/components/service-publish-step-seven/service-publish-step-seven.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';

@Injectable()
export class StepSevenHandlerService extends AbstractHandler {

    constructor() {
        super();
    }

    public handle(): number {
        return this.getIndex();
    }

    protected getIndex(): number {
        return ServicePublishStepSevenComponent.STEP;
    }
}
