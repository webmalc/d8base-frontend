import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {StepComponent} from '@app/order/abstract/step';
import {OrderWizardStateService} from '@app/order/services/order-wizard-state.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../core/models/user';
import {UserManagerService} from '../../../core/services/user-manager.service';
import {OrderClientDetailsFormFields} from '../../enums/order-client-details-form';

type UserDataFormModel = {
    [key in Exclude<
        OrderClientDetailsFormFields,
        | OrderClientDetailsFormFields.IsForMe
        | OrderClientDetailsFormFields.Comment
    >]: string | boolean | number;
};
@Component({
    selector: 'app-client-details-step',
    templateUrl: './client-details-step.component.html',
    styleUrls: ['./client-details-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailsStepComponent
    extends StepComponent
    implements OnInit, OnDestroy {
    public formFields = OrderClientDetailsFormFields;
    public form = this.fb.group({
        [this.formFields.IsForMe]: [false],
        [this.formFields.FirstName]: ['', Validators.required],
        [this.formFields.LastName]: [''],
        [this.formFields.Email]: [''],
        [this.formFields.Phone]: ['', Validators.required],
        [this.formFields.Comment]: ['']
    });

    private readonly userFields = [
        this.formFields.FirstName,
        this.formFields.LastName,
        this.formFields.Email,
        this.formFields.Phone
    ];

    private currentUserForm: UserDataFormModel;

    private readonly ngDestroy$ = new Subject<void>();

    constructor(
        wizardState: OrderWizardStateService,
        private readonly userManager: UserManagerService,
        private readonly fb: FormBuilder,
        private readonly cd: ChangeDetectorRef
    ) {
        super(wizardState);
    }

    public ngOnInit(): void {
        this.subscribeIsForMeControl();
        this.subscribeGetCurrentUser();
    }

    public ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }

    protected update(): void {
        this.wizardState.update({
            ...this.currentUserForm,
            ...this.form.value,
            [this.formFields.IsForMe]: !this.form.get(this.formFields.IsForMe)
        });
    }

    private subscribeIsForMeControl(): void {
        this.form
            .get(this.formFields.IsForMe)
            .valueChanges.pipe(takeUntil(this.ngDestroy$))
            .subscribe((isForMe) => {
                this.userFields.forEach((control) => {
                    if (isForMe) {
                        this.form.get(control).disable();
                    } else {
                        this.form.get(control).enable();
                    }
                });

                this.cd.markForCheck();
            });
    }

    private subscribeGetCurrentUser(): void {
        this.userManager
            .getCurrentUser()
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe((user: User) => {
                this.currentUserForm = this.userFields.reduce(
                    (allFields, currentField) => ({...allFields, [currentField]: user?.[currentField] ?? ''}),
                    {}
                ) as UserDataFormModel;
            });
    }
}
