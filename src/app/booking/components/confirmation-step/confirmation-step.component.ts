import { Component, forwardRef } from '@angular/core';
import { Params } from '@angular/router';
import { ProfessionalList, ServiceList } from '@app/api/models';
import { NavQueryParams } from '@app/core/constants/navigation.constants';
import { AuthenticationService, LocaleService } from '@app/core/services';
import { StepComponent } from '@app/booking/abstract/step';
import { OrderIds } from '@app/booking/enums/order-ids.enum';
import DateTimeStepData from '@app/booking/interfaces/date-time-step-data.interface';
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

  constructor(private readonly localeService: LocaleService, authenticator: AuthenticationService) {
    super();
    this.isAuthenticated$ = authenticator.isAuthenticated$;
  }

  public get professional(): ProfessionalList {
    return this.context?.professional;
  }

  public get service(): ServiceList {
    return this.context?.service;
  }

  public get locale(): string {
    return this.localeService.locale;
  }

  public setState(state): void {
    const dateStepState: DateTimeStepData = state[OrderIds.date];
    if (dateStepState) {
      this.date$.next(new Date(dateStepState.start_datetime));
    }
  }

  public changeLoginRegister(event: CustomEvent): void {
    const value: string = event.detail.value;
    this.outputData = value === 'register' ? { params: { [NavQueryParams.newUser]: true } } : {};
  }
}
