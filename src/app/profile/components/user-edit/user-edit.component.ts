import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';
import * as AppValidators from '@app/core/validators';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  public form: FormGroup;
  public formFields = ProfileFormFields;
  public user: Profile;

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  public ngOnInit(): void {
    this.profile$.pipe(first(x => !!x)).subscribe(user => {
      this.user = user;
      this.form = this.createForm(user);
    });
  }

  public submitForm(): void {
    if (isFormInvalid(this.form)) {
      return;
    }

    this.form.disable({ emitEvent: false });
    this.store.dispatch(new CurrentUserActions.UpdateProfile(this.form.getRawValue())).subscribe({
      next: () => {
        this.form.enable({ emitEvent: false });
        this.router.navigate(['/profile']);
      },
      error: () => {
        this.form.enable({ emitEvent: false });
      },
    });
  }

  private createForm(user: Profile): FormGroup {
    return this.formBuilder.group({
      [ProfileFormFields.FirstName]: [user.first_name, AppValidators.firstNameValidators],
      [ProfileFormFields.LastName]: [user.last_name, AppValidators.lastNameValidators],
      [ProfileFormFields.Patronymic]: [user.patronymic, Validators.maxLength(30)],
      [ProfileFormFields.Email]: [user.email, [Validators.required, AppValidators.email]],
      [ProfileFormFields.Phone]: [user.phone_extended],
      [ProfileFormFields.Gender]: [user.gender?.toString()],
    });
  }
}
