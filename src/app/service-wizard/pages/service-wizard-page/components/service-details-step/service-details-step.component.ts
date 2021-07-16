import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslationService } from '@app/core/services';
import { startWith, takeUntil } from 'rxjs/operators';
import { ServiceDetailsFormComponent } from '../../../../components/service-details-form/service-details-form.component';
import { ServiceDetailsInterface } from '../../../../interfaces/service-details.interface';
import { ServiceStepContext } from '../../interfaces/step-context.interface';
import { ServiceStepComponent } from '../step/step';

@Component({
  selector: 'app-service-details-step',
  templateUrl: './service-details-step.component.html',
  styleUrls: ['./service-details-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ServiceStepComponent,
      useExisting: forwardRef(() => ServiceDetailsStepComponent),
    },
  ],
})
export class ServiceDetailsStepComponent extends ServiceStepComponent<ServiceDetailsInterface> implements OnInit {
  public form: FormGroup;
  @ViewChild(ServiceDetailsFormComponent, { static: true }) private readonly formComponent: ServiceDetailsFormComponent;

  constructor(public readonly trans: TranslationService, protected readonly cd: ChangeDetectorRef) {
    super(cd);
  }

  public ngOnInit(): void {
    this.initForm();
    this.subscribeFormStatus();
  }

  protected onStateChanged(data: ServiceDetailsInterface): void {
    if (!data) {
      return;
    }

    this.form.patchValue(data);
  }

  protected onContextChanged(context: ServiceStepContext): void {
    super.onContextChanged(context);
  }

  private subscribeFormStatus(): void {
    this.form.statusChanges.pipe(startWith(this.form.status), takeUntil(this.ngDestroy$)).subscribe(() => {
      this.outputData = this.form.valid ? this.getStepState() : null;
      this.isValid$.next(this.form.valid);
    });
  }

  private initForm(): void {
    this.form = this.formComponent.createForm();
  }

  private getStepState(): ServiceDetailsInterface {
    return this.form.value;
  }
}
