import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Profile } from '@app/api/models';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { ProfileFormService } from '@app/profile/forms/profile-form.service';
import { RegisterEmailApiService } from '@app/profile/services/register-email-api.service';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
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
    private readonly location: Location,
    private readonly registerEmailApi: RegisterEmailApiService,
    private readonly formService: ProfileFormService,
  ) {}

  public ngOnInit(): void {
    this.profile$.pipe(first(x => !!x)).subscribe(user => {
      this.user = user;
      this.form = this.formService.createForm(user);
    });
  }

  @Dispatch()
  public updateUser(profile: Partial<Profile>): CurrentUserActions.UpdateProfile {
    return new CurrentUserActions.UpdateProfile(profile);
  }

  public submitForm(): void {
    this.updateUser(this.form.getRawValue());
    if (this.user.email !== this.form.get(this.formFields.Email).value) {
      this.registerEmailApi.post(this.form.get(this.formFields.Email).value).subscribe();
    }
    this.location.back();
  }
}
