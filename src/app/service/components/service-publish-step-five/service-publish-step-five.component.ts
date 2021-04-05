import { Component, OnInit } from '@angular/core';
import { Profile } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { HelperService } from '@app/core/services/helper.service';
import { ServicePublishStepFiveFormFields } from '@app/service/enums/service-publish-step-five-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { ServicePublishStepFiveFormService } from '@app/service/forms/service-publish-step-five-form.service';
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

  public readonly formFields = ServicePublishStepFiveFormFields;

  constructor(
    public formService: ServicePublishStepFiveFormService,
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    public serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly destroy$: NgDestroyService,
  ) {
  }

  public ngOnInit(): void {
    if (this.servicePublishDataHolder.isset(ServicePublishSteps.Five)) {
      this.formService.createForm(
        this.servicePublishDataHolder.getStepData<StepFiveDataInterface>(ServicePublishSteps.Five),
      );
    } else {
      this.profile$.pipe(takeUntil(this.destroy$)).subscribe((profile) => {
        const { first_name, last_name, gender } = profile ?? {};
        const stepFiveInitData: StepFiveDataInterface = {
          first_name,
          last_name,
          gender,
          _avatar: null,
        };
        this.formService.createForm(stepFiveInitData);
      });
    }
  }

  public get avatar(): string {
    return this.formService?.form.get(this.formFields.Avatar).value || HelperService.getNoAvatarLink();
  }

  public submitForm(): void {
    this.servicePublishDataHolder.setStepData<StepFiveDataInterface>(
      ServicePublishSteps.Five, this.formService.form.getRawValue(),
    );
    this.serviceStepsNavigationService.next();
  }

  public onSelect(data: { addedFiles: File[] }): void {
    this.formService.addPhoto(data.addedFiles.pop());
  }

  public onRemove(): void {
    this.formService.deletePhoto();
  }
}
