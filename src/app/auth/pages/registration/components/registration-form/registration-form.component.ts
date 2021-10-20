import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultRegisterUser, UserLocation } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { LocationResolverService, NgDestroyService } from '@app/core/services';
import * as AppValidators from '@app/core/validators';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [NgDestroyService],
})
export class RegistrationFormComponent {
  public readonly formFields = {
    Email: 'email',
    FirstName: 'first_name',
    LastName: 'last_name',
    Password: 'password',
    Confirm: 'password_confirm',
    Phone: 'phone',
    Country: 'country',
    City: 'city',
  };

  public form: FormGroup = this.fb.group(
    {
      [this.formFields.Email]: ['', [Validators.required, AppValidators.email]],
      [this.formFields.FirstName]: ['', AppValidators.firstNameValidators],
      [this.formFields.LastName]: ['', AppValidators.lastNameValidators],
      [this.formFields.Password]: ['', AppValidators.passwordValidators],
      [this.formFields.Confirm]: ['', AppValidators.passwordValidators],
      [this.formFields.Country]: [null, Validators.required],
      [this.formFields.City]: [null, Validators.required],
      [this.formFields.Phone]: [null],
    },
    {
      validators: AppValidators.confirmPasswordValidator(this.formFields.Password, this.formFields.Confirm),
    },
  );

  @Input()
  public errorMessages: string[];

  @Output()
  public readonly registrationFormData = new EventEmitter<{ user: DefaultRegisterUser; location: UserLocation }>();

  @Select(UserLocationSelectors.defaultLocation)
  public defaultLocation: Observable<UserLocation>;

  private _pending: boolean = false;

  // codebeat:disable[ARITY]
  constructor(private readonly fb: FormBuilder, locationResolver: LocationResolverService, destroy$: NgDestroyService) {
    this.defaultLocation
      .pipe(
        filter(x => !!x?.country),
        switchMap(defaultLocation => locationResolver.resolveLocation(defaultLocation)),
        takeUntil(destroy$),
      )
      .subscribe(result => {
        this.form.controls[this.formFields.Country].setValue(result.country);
        this.form.controls[this.formFields.City].setValue(result.city);
      });
  }

  public get pending(): boolean {
    return this._pending;
  }

  @Input()
  public set pending(value: boolean) {
    this._pending = value;
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public submitRegistrationForm(): void {
    if (isFormInvalid(this.form)) {
      return;
    }
    const formData: object = this.form.getRawValue();

    const user: DefaultRegisterUser = {
      first_name: formData[this.formFields.FirstName],
      last_name: formData[this.formFields.LastName],
      email: formData[this.formFields.Email],
      password: formData[this.formFields.Password],
      password_confirm: formData[this.formFields.Confirm],
      phone: formData[this.formFields.Phone],
    };
    const location: UserLocation = {
      country: formData[this.formFields.Country].id,
      city: formData[this.formFields.City]?.id,
    };
    this.registrationFormData.emit({ user, location });
  }
}
