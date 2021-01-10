import { Injectable } from '@angular/core';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { AbstractHandler } from '@app/service/services/steps-navigation-chain/abstract-handler';
import { Observable, of } from 'rxjs';

@Injectable()
export class StepThreeHandlerService extends AbstractHandler {

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
    return ServicePublishSteps.Three;
  }
}
