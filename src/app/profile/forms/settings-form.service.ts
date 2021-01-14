import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserSettings } from '@app/core/models/user-settings';
import { AppValidators } from '@app/core/validators/app.validators';
import { UserSettingsFromFields } from '@app/profile/enums/user-settings-from-fields';

@Injectable()
export class SettingsFormService {

  public form: FormGroup;
  public languages: Array<{ value: string; display_name: string }>;
  public currency: Array<{ value: string; display_name: string }>;
  public units = ['metric', 'imperial/US'];

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public createForm(userSettings: UserSettings): FormGroup {
    return this.form = this.formBuilder.group({
      [UserSettingsFromFields.Language]: [
        userSettings?.language, [
          AppValidators.restrictEnum(this.languages?.map(lang => lang.value)),
        ],
      ],
      [UserSettingsFromFields.Currency]: [
        userSettings?.currency, [
          AppValidators.restrictEnum(this.currency?.map(cur => cur.value)),
        ],
      ],
      [UserSettingsFromFields.Units]: [
        userSettings?.units?.toString(10),
      ],
    });
  }

  public setLists(
    languagesList: Array<{ value: string; display_name: string }>,
    currencyList: Array<{ value: string; display_name: string }>,
  ): void {
    this.languages = languagesList;
    this.currency = currencyList;
  }

  public isSubmitDisabled(): boolean {
    return !(this.form.dirty && this.form.valid);
  }
}
