import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfessionalList } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepOneDataInterface } from '@app/service/interfaces/step-one-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-publish-step-one',
  templateUrl: './service-publish-step-one.component.html',
  styleUrls: ['./service-publish-step-one.component.scss'],
})
export class ServicePublishStepOneComponent {
  @Select(CurrentUserSelectors.defaultProfessional)
  public defaultProfessional$: Observable<ProfessionalList>;

  public formFields = {
    Category: 'category',
    Subcategory: 'subcategory',
  };
  public form = this.formBuilder.group({
    [this.formFields.Category]: ['', Validators.required],
    [this.formFields.Subcategory]: ['', Validators.required],
  });

  constructor(
    private readonly servicePublishDataHolderService: ServicePublishDataHolderService,
    private readonly serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.fillFormValue();
  }

  public async submitForm(): Promise<void> {
    if (isFormInvalid(this.form)) {
      return;
    }

    await this.servicePublishDataHolderService.setStepData<StepOneDataInterface>(ServicePublishSteps.One, {
      category: this.form.get(this.formFields.Category).value,
      subcategory: this.form.get(this.formFields.Subcategory).value,
    });
    this.serviceStepsNavigationService.next();
  }

  private fillFormValue(): void {
    if (this.servicePublishDataHolderService.isset(ServicePublishSteps.One)) {
      const stepData = this.servicePublishDataHolderService.getStepData<StepOneDataInterface>(ServicePublishSteps.One);
      this.form.patchValue(stepData);
    }
  }
}
