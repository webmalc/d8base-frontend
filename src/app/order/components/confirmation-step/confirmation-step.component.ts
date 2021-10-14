import { Component, forwardRef } from '@angular/core';
import { Params } from '@angular/router';
import { ProfessionalList, ServiceList } from '@app/api/models';
import { NavQueryParams } from '@app/core/constants/navigation.constants';
import { AuthenticationService } from '@app/core/services';
import { StepComponent } from '@app/order/abstract/step';
import { OrderIds } from '@app/order/enums/order-ids.enum';
import DateTimeStepData from '@app/order/interfaces/date-time-step-data.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.scss'],
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => ConfirmationStepComponent),
    },
  ],
})
export class ConfirmationStepComponent extends StepComponent<{ params?: Params }> {
  public date$ = new BehaviorSubject<Date | null>(null);
  public isAuthenticated$: Observable<boolean>;

  constructor(authenticator: AuthenticationService) {
    super();
    this.isAuthenticated$ = authenticator.isAuthenticated$;
  }

  public get professional(): ProfessionalList {
    return this.context?.professional;
  }

  public get service(): ServiceList {
    return this.context?.service;
  }

  public setState(data): void {
    const dateStepState: DateTimeStepData = data[OrderIds.date];
    if (dateStepState) {
      this.date$.next(new Date(dateStepState.start_datetime));
    }
  }

  public changeLoginRegister(event: CustomEvent): void {
    const value: string = event.detail.value;
    this.outputData = value === 'register' ? { params: { [NavQueryParams.newUser]: true } } : {};
  }
}
