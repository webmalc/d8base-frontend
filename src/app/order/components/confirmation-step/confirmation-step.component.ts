import { Component, forwardRef } from '@angular/core';
import { ProfessionalList, ServiceList } from '@app/api/models';
import { StepComponent } from '@app/order/abstract/step';
import { OrderIds } from '@app/order/enums/order-ids.enum';
import { OrderWizardStateService } from '@app/order/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class ConfirmationStepComponent extends StepComponent<void> {
  public date$: Observable<Date>;

  constructor(private readonly state: OrderWizardStateService) {
    super();
    // TODO should be transparent access to steps state with type checking
    this.date$ = state.getStepStateById(OrderIds.Date).pipe(map(x => x?.start_datetime));
  }

  public get professional(): ProfessionalList {
    return this.context?.professional;
  }

  public get service(): ServiceList {
    return this.context?.service;
  }

  public setState(): void {
    // do nothing
  }
}
