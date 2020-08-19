import {Injectable} from '@angular/core';
import {ServicePublishStepThreeComponent} from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';

@Injectable()
export class StepThreeHandlerService extends AbstractHandler {

    constructor() {
        super();
    }

    public handle(): number {
        return this.getIndex();
    }

    protected getIndex(): number {
        return ServicePublishStepThreeComponent.STEP;
    }
}
