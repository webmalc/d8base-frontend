import {Component} from '@angular/core';
import {Currency} from '@app/core/models/currency';
import {CurrencyListApiService} from '@app/core/services/currency-list-api.service';
import {ServicePublishStepTwoFormFields} from '@app/service/enums/service-publish-step-two-form-fields';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {ServicePublishStepTwoFormService} from '@app/service/forms/service-publish-step-two-form.service';
import {StepTwoDataInterface} from '@app/service/interfaces/step-two-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {UserSettingsService} from '@app/shared/services/user-settings.service';
import {BehaviorSubject, of} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-step-two',
    templateUrl: './service-publish-step-two.component.html',
    styleUrls: ['./service-publish-step-two.component.scss'],
})
export class ServicePublishStepTwoComponent extends Reinitable {

    public serviceTypeList = ['online', 'professional', 'client'];
    public readonly formFields = ServicePublishStepTwoFormFields;
    public currencyList$: BehaviorSubject<Currency[]> =
        new BehaviorSubject<Currency[]>([]);

    constructor(
        private readonly servicePublishDataHolder: ServicePublishDataHolderService,
        public readonly formService: ServicePublishStepTwoFormService,
        public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
        private readonly currencyList: CurrencyListApiService,
        private readonly userSettings: UserSettingsService,
    ) {
        super();
    }

    public submitForm(): void {
        this.servicePublishDataHolder.setStepData<StepTwoDataInterface>(
            ServicePublishSteps.Two, this.formService.form.getRawValue(),
        );
        this.serviceStepsNavigationService.next();
    }

    protected init(): void {
        this.currencyList.getList().subscribe(data => this.currencyList$.next(data));
        if (this.servicePublishDataHolder.isset(ServicePublishSteps.Two)) {
            this.formService.createForm(
                this.servicePublishDataHolder.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two),
            );
        } else {
            this.formService.createForm();
        }
        this.initDefaultCurrency();
    }

    private initDefaultCurrency(): void {
        this.userSettings.userSettings$.pipe(
            first(),
            switchMap(settings => settings?.currency ? this.currencyList.getByName(settings.currency) : of(null)),
        ).subscribe(currency => {
            this.formService.form.get(this.formFields.Currency).setValue(currency);
        });
    }
}
