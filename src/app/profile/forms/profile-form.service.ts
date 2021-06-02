import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '@app/api/models';
import { AppValidators } from '@app/core/validators/app.validators';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';

@Injectable({
  providedIn: 'root',
})
export class ProfileFormService {
  constructor(private readonly formBuilder: FormBuilder) {}

  public createForm(user: Profile): FormGroup {
    return this.formBuilder.group({
      [ProfileFormFields.FirstName]: [
        user.first_name,
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      ],
      [ProfileFormFields.LastName]: [
        user.last_name,
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      ],
      [ProfileFormFields.Patronymic]: [user.patronymic, [Validators.minLength(1), Validators.maxLength(20)]],
      [ProfileFormFields.Email]: [user.email, [Validators.required, AppValidators.email]],
      [ProfileFormFields.Phone]: [user.phone_extended],
      [ProfileFormFields.Gender]: [user.gender?.toString()],
    });
  }
}
