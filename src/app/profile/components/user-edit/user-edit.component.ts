import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Profile } from '@app/api/models';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { ProfileFormFields } from '@app/profile/enums/profile-form-fields';
import { ProfileFormService } from '@app/profile/forms/profile-form.service';
import { ProfileService } from '@app/profile/services/profile.service';
import { RegisterEmailApiService } from '@app/profile/services/register-email-api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {

  public form: FormGroup;
  public formFields = ProfileFormFields;
  public user: Profile;

  constructor(
    private readonly profileService: ProfileService,
    private readonly location: Location,
    private readonly registerEmailApi: RegisterEmailApiService,
    private readonly formService: ProfileFormService,
    private readonly userManager: UserManagerService,
  ) {
  }

  public ngOnInit(): void {
    this.userManager.getCurrentUser().subscribe(
      user => {
        this.user = user;
        this.form = this.formService.createForm(user);
      },
    );
  }

  public submitForm(): void {
    this.profileService.updateUser(
      this.form.getRawValue(),
    );
    if (this.user.email !== this.form.get(this.formFields.Email).value) {
      this.registerEmailApi.post(this.form.get(this.formFields.Email).value).subscribe();
    }
    this.location.back();
  }

  public isSubmitDisabled(): boolean {
    return !(this.form.dirty && this.form.valid);
  }
}
