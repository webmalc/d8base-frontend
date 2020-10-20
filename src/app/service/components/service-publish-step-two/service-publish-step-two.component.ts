import {Component} from '@angular/core';
import {Currency} from '@app/core/models/currency';
import {CurrencyListApiService} from '@app/core/services/currency-list-api.service';
import {TranslationService} from '@app/core/services/translation.service';
import {ServicePublishStepTwoFormFields} from '@app/service/enums/service-publish-step-two-form-fields';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {ServicePublishStepTwoFormService} from '@app/service/forms/service-publish-step-two-form.service';
import {StepTwoDataInterface} from '@app/service/interfaces/step-two-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-service-publish-step-two',
    templateUrl: './service-publish-step-two.component.html',
    styleUrls: ['./service-publish-step-two.component.scss'],
})
export class ServicePublishStepTwoComponent extends Reinitable {

    public firstDurationList: string[] = ['days', 'hours', 'minutes'];
    public secondDurationList: string[] = ['days', 'hours', 'minutes'];
    public durationFirstValue: number;
    public durationSecondValue: number;
    public serviceTypeList = ['online', 'professional', 'client'];
    public readonly formFields = ServicePublishStepTwoFormFields;
    public currencyList$: BehaviorSubject<Currency[]> =
        new BehaviorSubject<Currency[]>([]);
    private readonly defaultDuration = ['days', 'hours', 'minutes'];

    constructor(
        private readonly servicePublishDataHolder: ServicePublishDataHolderService,
        public formService: ServicePublishStepTwoFormService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        public currencyList: CurrencyListApiService,
        public trans: TranslationService
    ) {
        super();
    }

    public recomputeFirstDurationLists(val: any): void {
        const list = [...this.defaultDuration];
        list.splice(list.indexOf(val), 1);
        this.firstDurationList = list;
    }

    public recomputeSecondDurationLists(val: string): void {
        const list = [...this.defaultDuration];
        list.splice(list.indexOf(val), 1);
        this.secondDurationList = list;
    }

    public submitForm(): void {
        this.servicePublishDataHolder.setStepData<StepTwoDataInterface>(
            ServicePublishSteps.Two, this.formService.form.getRawValue()
        );
        this.serviceStepsNavigationService.next();
    }

    public durationHoursChange(): void {
        this.durationFirstValue = parseInt(this.formService.form.get(this.formFields.DurationFirst).value, 10);
    }

    public durationMinutesChange(): void {
        this.durationSecondValue = parseInt(this.formService.form.get(this.formFields.DurationSecond).value, 10);
    }

    protected init(): void {
        this.currencyList.getList().subscribe(data  => this.currencyList$.next(data));
        if (this.servicePublishDataHolder.isset(ServicePublishSteps.Two)) {
            this.formService.createForm(
                this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two)
            );
        } else {
            this.formService.createForm();
        }
    }
}
