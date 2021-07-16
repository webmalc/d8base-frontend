import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslationService } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import { ServiceInfoFormComponent } from '../../../../components/service-info-form/service-info-form.component';
import { ServiceInfoInterface } from '../../../../interfaces/service-info.interface';
import { ServiceStepContext } from '../../interfaces/step-context.interface';
import { ServiceStepComponent } from '../step/step';

@Component({
  selector: 'app-service-info-step',
  templateUrl: './service-info-step.component.html',
  styleUrls: ['./service-info-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ServiceStepComponent,
      useExisting: forwardRef(() => ServiceInfoStepComponent),
    },
  ],
})
export class ServiceInfoStepComponent extends ServiceStepComponent<ServiceInfoInterface> implements OnInit {
  public form: FormGroup;
  @ViewChild(ServiceInfoFormComponent, { static: true }) private readonly formComponent: ServiceInfoFormComponent;

  constructor(public readonly trans: TranslationService, protected readonly cd: ChangeDetectorRef) {
    super(cd);
  }

  public ngOnInit(): void {
    this.initForm();
    this.subscribeFormStatus();
  }

  protected onStateChanged(data: ServiceInfoInterface): void {
    if (!data) {
      return;
    }
    this.form.patchValue(data);
    this.cd.markForCheck();
  }

  protected onContextChanged(context: ServiceStepContext): void {
    super.onContextChanged(context);
  }

  private subscribeFormStatus(): void {
    this.form.statusChanges.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.outputData = this.form.valid ? this.getStepState() : null;
      this.isValid$.next(this.form.valid);
    });
  }

  private initForm(): void {
    this.form = this.formComponent.createForm();
  }

  private getStepState(): ServiceInfoInterface {
    return this.form.value;
  }
}
