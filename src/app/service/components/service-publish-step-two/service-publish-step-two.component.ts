import {Component, OnInit} from '@angular/core';
import {CurrencyListService} from '@app/core/services/currency-list.service';
import {TranslationService} from '@app/core/services/translation.service';
import {ServicePublishStepTwoFormFields} from '@app/service/enums/service-publish-step-two-form-fields';
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
export class ServicePublishStepTwoComponent extends Reinitable implements OnInit {

    public firstDurationList: string[] = ['days', 'hours', 'minutes'];
    public secondDurationList: string[] = ['days', 'hours', 'minutes'];
    public durationFirstValue: number;
    public durationSecondValue: number;
    public serviceTypeList = ['online', 'professional', 'client'];
    public readonly formFields = ServicePublishStepTwoFormFields;
    public currencyList$: BehaviorSubject<{ value: string, display_name: string }[]> =
        new BehaviorSubject<{value: string; display_name: string}[]>([]);
    private readonly STEP = 1;
    private defaultDuration = ['days', 'hours', 'minutes'];

    constructor(
        private servicePublishDataHolder: ServicePublishDataHolderService,
        public formService: ServicePublishStepTwoFormService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        public currencyList: CurrencyListService,
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

    public ngOnInit(): void {
        this.currencyList.getCurrencyList().subscribe(data => this.currencyList$.next(data));
        if (this.servicePublishDataHolder.isset(this.STEP)) {
            this.formService.createForm(this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishDataHolder.setStepData(this.STEP, this.formService.form.getRawValue());
        this.serviceStepsNavigationService.navigateToNextStep();
    }

    public durationHoursChange(): void {
        this.durationFirstValue = parseInt(this.formService.form.get(this.formFields.DurationFirst).value, 10);
    }

    public durationMinutesChange(): void {
        this.durationSecondValue = parseInt(this.formService.form.get(this.formFields.DurationSecond).value, 10);
    }
}
