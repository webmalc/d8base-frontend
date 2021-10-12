import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Profile } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { UserManagerService } from '@app/core/services/managers/user-manager.service';
import * as AppValidators from '@app/core/validators';
import { StepComponent } from '@app/order/abstract/step';
import { OrderClientDetailsFormFields } from '@app/order/enums/order-client-details-form';
import { ClientDetailsStepData } from '@app/order/interfaces/client-details-step-data.type';
import StepContext from '@app/order/interfaces/step-context.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-client-details-step',
  templateUrl: './client-details-step.component.html',
  styleUrls: ['./client-details-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => ClientDetailsStepComponent),
    },
    NgDestroyService,
  ],
})
export class ClientDetailsStepComponent extends StepComponent<ClientDetailsStepData> implements OnInit {
  public formFields = OrderClientDetailsFormFields;

  public isSelfOrder: boolean = false;

  private readonly userFields = [
    this.formFields.FirstName,
    this.formFields.LastName,
    this.formFields.Email,
    this.formFields.Phone,
  ];

  private currentUserForm: ClientDetailsStepData;

  constructor(
    protected readonly cd: ChangeDetectorRef,
    private readonly userManager: UserManagerService,
    private readonly fb: FormBuilder,
    private readonly ngDestroy$: NgDestroyService,
  ) {
    super();
    this.form = this.fb.group({
      [this.formFields.IsForMe]: [false],
      [this.formFields.FirstName]: ['', Validators.required],
      [this.formFields.LastName]: [''],
      [this.formFields.Email]: ['', AppValidators.email],
      [this.formFields.Phone]: ['', Validators.required],
      [this.formFields.Comment]: [''],
    });
  }

  public ngOnInit(): void {
    this.subscribeIsForMeControl();
    this.subscribeGetCurrentUser();
    this.subscribeFormStatus();
  }

  public setState(data: ClientDetailsStepData): void {
    if (!data) {
      return;
    }
    const isForMe = !data[this.formFields.IsForMe];
    this.form.patchValue({
      ...(!isForMe ? data : {}),
      [this.formFields.IsForMe]: isForMe,
      [this.formFields.Comment]: data[this.formFields.Comment],
    });
    this.disableUserFields(isForMe);
  }

  public setContext(context: StepContext): void {
    super.setContext(context);
    this.setSelfOrder();
  }

  private subscribeIsForMeControl(): void {
    this.form
      .get(this.formFields.IsForMe)
      .valueChanges.pipe(takeUntil(this.ngDestroy$))
      .subscribe(isForMe => {
        this.disableUserFields(isForMe);
        this.cd.markForCheck();
      });
  }

  private subscribeGetCurrentUser(): void {
    this.userManager
      .getCurrentUser()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((user: Profile) => {
        this.currentUserForm = this.userFields.reduce(
          (allFields, currentField) => ({
            ...allFields,
            [currentField]: user?.[currentField] ?? '',
          }),
          {},
        ) as ClientDetailsStepData;
      });
  }

  private subscribeFormStatus(): void {
    this.form.statusChanges.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.outputData = this.form.valid ? this.getStepState() : null;
    });
  }

  private getStepState(): ClientDetailsStepData {
    return {
      ...this.currentUserForm,
      ...this.form.value,
      [this.formFields.IsForMe]: !this.form.get(this.formFields.IsForMe).value,
    };
  }

  private disableUserFields(isDisable: boolean = true): void {
    this.userFields.forEach(control => {
      if (isDisable) {
        this.form.get(control).disable({ emitEvent: false });
      } else {
        this.form.get(control).enable({ emitEvent: false });
      }
    });
  }

  private setSelfOrder(): void {
    this.isSelfOrder = this.context.isSelfOrder;
  }
}
