import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicePublishStepSevenDepartureFormFields } from '@app/service/enums/service-publish-step-seven-departure-form-fields';
import { StepSevenDepartureDataInterface } from '@app/service/interfaces/step-seven-departure-data-interface';

@Injectable()
export class ServicePublishStepSevenDepartureFormService {

  public form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public createForm(data?: StepSevenDepartureDataInterface): void {
    this.form = this.formBuilder.group({
        // [ServicePublishStepSevenDepartureFormFields.NotWithinTheCity]: [data?.not_within_the_city ?? false],
        [ServicePublishStepSevenDepartureFormFields.MaxDistance]: [data?.max_distance],
        [ServicePublishStepSevenDepartureFormFields.Units]: [data?.units],
      },
      // {validators: this.maxDistanceValidator}
    );
  }

  public isSubmitDisabled(): boolean {
    return this.form.invalid;
  }

  // private maxDistanceValidator(group: FormGroup): any {
  //     if (group.get(ServicePublishStepSevenDepartureFormFields.NotWithinTheCity).value &&
  //         !group.get(ServicePublishStepSevenDepartureFormFields.MaxDistance).value) {
  //         group.get(ServicePublishStepSevenDepartureFormFields.MaxDistance).setErrors({emptyDistanceError: true});
  //     } else {
  //         return null;
  //     }
  // }
}
