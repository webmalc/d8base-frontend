import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';
import * as AppValidators from '@app/core/validators';
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
  public formFields = {
    email: 'email',
    firstName: 'first_name',
    lastName: 'last_name',
    patronymic: 'patronymic',
    phone: 'phone',
    gender: 'gender',
    avatar: 'avatar',
  };

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
      [this.formFields.firstName]: [user.first_name, AppValidators.firstNameValidators],
      [this.formFields.lastName]: [user.last_name, AppValidators.lastNameValidators],
      [this.formFields.patronymic]: [user.patronymic, Validators.maxLength(30)],
      [this.formFields.email]: [user.email, [Validators.required, AppValidators.email]],
      [this.formFields.phone]: [user.phone_extended],
      [this.formFields.gender]: [user.gender?.toString()],
    });
  }
}
