import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Rate, UserLocation } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { RatesApiCache } from '@app/core/services/cache';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

enum FlagMenuFormFields {
  language = 'language',
  currency = 'currency',
  units = 'units',
  is_monday_start_of_a_week = 'is_monday_start_of_a_week',
}

@Component({
  selector: 'app-flag-menu',
  templateUrl: './flag-menu.component.html',
  styleUrls: ['./flag-menu.component.scss'],
  providers: [NgDestroyService],
})
export class FlagMenuComponent {
  public defaultLocation$: Observable<UserLocation>;
  public rateList$: Observable<Rate[]>;
  public formFields = FlagMenuFormFields;
  public languageControl = this.fb.control(null);
  public form: FormGroup = this.fb.group({
    [this.formFields.currency]: null,
    [this.formFields.units]: null,
    [this.formFields.is_monday_start_of_a_week]: null,
  });

  constructor(
    public readonly userSettingsService: UserSettingsService,
    private readonly fb: FormBuilder,
    private readonly destroy$: NgDestroyService,
    userManager: UserManagerService,
    rates: RatesApiCache,
  ) {
    this.defaultLocation$ = userManager.defaultLocation$.pipe(filter(x => !!x));
    this.rateList$ = rates.list();
    this.subscribeUserSettings();
    this.subscribeFormValueChanges();
    this.subscribeLanguageControlValueChanges();
  }

  private subscribeUserSettings(): void {
    this.userSettingsService.userSettings$.pipe(takeUntil(this.destroy$)).subscribe(userSettings => {
      this.form.patchValue(userSettings, { emitEvent: false });
      this.languageControl.setValue(userSettings.language, { emitEvent: false });
    });
  }

  private subscribeFormValueChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      this.userSettingsService.saveSettings(changes);
    });
  }

  private subscribeLanguageControlValueChanges(): void {
    this.languageControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      this.userSettingsService.saveSettingsLanguage(changes);
    });
  }
}
