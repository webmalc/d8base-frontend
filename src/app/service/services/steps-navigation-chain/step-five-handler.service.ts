import { Injectable } from '@angular/core';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepFourDataInterface } from '@app/service/interfaces/step-four-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { AbstractHandler } from '@app/service/services/steps-navigation-chain/abstract-handler';
import { Observable, of } from 'rxjs';

@Injectable()
export class StepFiveHandlerService extends AbstractHandler {

  constructor(
    private readonly servicePublishDataHolderService: ServicePublishDataHolderService,
  ) {
    super();
  }

  public handleNext(): Observable<number> {
    return this.handle(super.handleNext.bind(this));
  }

  public handlePrevious(): Observable<number> {
    return this.handle(super.handlePrevious.bind(this));
  }

  protected getIndex(): number {
    return ServicePublishSteps.Five;
  }

  private handle(handler: () => Observable<number>): Observable<number> {
    if ((this.servicePublishDataHolderService.isset(ServicePublishSteps.Four) &&
      !this.servicePublishDataHolderService.getStepData<StepFourDataInterface>(ServicePublishSteps.Four).isNewUser) ||
      !this.servicePublishDataHolderService.isset(ServicePublishSteps.Four)) {
      return handler();
    }

    return of(this.getIndex());
  }
}
