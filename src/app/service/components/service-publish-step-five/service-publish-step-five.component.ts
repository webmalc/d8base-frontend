import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '@app/api/models';
import { getNoAvatarLink } from '@app/core/functions/media.functions';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { NgDestroyService } from '@app/core/services';
import { ServicePublishStepFiveFormFields } from '@app/service/enums/service-publish-step-five-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepFiveDataInterface } from '@app/service/interfaces/step-five-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-service-publish-step-five',
  templateUrl: './service-publish-step-five.component.html',
  styleUrls: ['./service-publish-step-five.component.scss'],
  providers: [NgDestroyService],
})
export class ServicePublishStepFiveComponent implements OnInit {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  public form: FormGroup;
  public readonly formFields = ServicePublishStepFiveFormFields;

  constructor(
    public serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    private readonly destroy$: NgDestroyService,
  ) {}

  public get avatar(): string {
    return this.form?.get(this.formFields.Avatar).value || getNoAvatarLink();
  }

  public ngOnInit(): void {
    if (this.servicePublishDataHolder.isset(ServicePublishSteps.Five)) {
      this.createForm(this.servicePublishDataHolder.getStepData<StepFiveDataInterface>(ServicePublishSteps.Five));
    } else {
      this.profile$.pipe(takeUntil(this.destroy$)).subscribe(profile => {
        const { first_name, last_name, gender } = profile ?? {};
        const stepFiveInitData: StepFiveDataInterface = {
          first_name,
          last_name,
          gender,
          _avatar: null,
        };
        this.createForm(stepFiveInitData);
      });
    }
  }

  public submitForm(): void {
    if (isFormInvalid(this.form)) {
      return;
    }

    this.servicePublishDataHolder.setStepData<StepFiveDataInterface>(ServicePublishSteps.Five, this.form.getRawValue());
    this.serviceStepsNavigationService.next();
  }

  private createForm(data?: StepFiveDataInterface): void {
    this.form = this.formBuilder.group({
      [ServicePublishStepFiveFormFields.FirstName]: [data?.first_name, Validators.required],
      [ServicePublishStepFiveFormFields.LastName]: [data?.last_name ?? ''],
      [ServicePublishStepFiveFormFields.Gender]: [data?.gender ?? null],
      [ServicePublishStepFiveFormFields.Avatar]: [data?._avatar],
    });
  }
}
