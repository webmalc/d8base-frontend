import {Injectable} from '@angular/core';
import {ServicePublishStepSevenComponent} from '@app/service/components/service-publish-step-seven/service-publish-step-seven.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';
import {Observable, of} from 'rxjs';

@Injectable()
export class StepSevenHandlerService extends AbstractHandler {

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
        return ServicePublishStepSevenComponent.STEP;
    }
}
