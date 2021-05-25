import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { AbstractHandler } from '@app/service/services/steps-navigation-chain/abstract-handler';
import { Observable, of } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

@Injectable()
export class StepFourHandlerService extends AbstractHandler {
  constructor(private readonly authenticationService: AuthenticationService) {
    super();
  }

  public handleNext(): Observable<number> {
    return this.handle(super.handleNext.bind(this));
  }

  public handlePrevious(): Observable<number> {
    return this.handle(super.handlePrevious.bind(this));
  }

  protected getIndex(): number {
    return ServicePublishSteps.Four;
  }

  private handle(handler: () => Observable<number>): Observable<number> {
    return this.authenticationService.isAuthenticated$.pipe(
      first(),
      mergeMap(isAuthenticated => (isAuthenticated ? handler() : of(this.getIndex()))),
    );
  }
}
