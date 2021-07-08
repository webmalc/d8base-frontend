import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLocation } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { FullLocationService } from '@app/core/services/location/full-location.service';
import { TimezoneService } from '@app/core/services/timezone.service';
import { map, shareReplay, startWith, switchMap, takeUntil } from 'rxjs/operators';

enum LocationFormFields {
  country = 'country',
  region = 'region',
  subregion = 'subregion',
  city = 'city',
  district = 'district',
  coordinates = 'coordinates',
  postal_code = 'postal_code',
  address = 'address',
  timezone = 'timezone',
  is_default = 'is_default',
}

@Component({
  selector: 'app-location-editor',
  templateUrl: './location-editor.component.html',
  styleUrls: ['./location-editor.component.scss'],
  providers: [NgDestroyService],
})
export class LocationEditorComponent {
  @Output() public save = new EventEmitter<UserLocation>();
  @Output() public delete = new EventEmitter<UserLocation>();

  public readonly formFields = LocationFormFields;
  public timezoneList$ = this.timezoneService.getTimezoneList().pipe(shareReplay(1));
  public country = new FormControl(null, [Validators.required]);
  public region = new FormControl(null);
  public subregion = new FormControl(null);
  public city = new FormControl(null, [Validators.required]);
  public district = new FormControl(null);
  public coordinates = new FormControl(null);
  public postal = new FormControl(null);
  public address = new FormControl(null);
  public timezone = new FormControl(null);
  public isDefault = new FormControl(null);
  public form = new FormGroup({
    [this.formFields.country]: this.country,
    [this.formFields.region]: this.region,
    [this.formFields.subregion]: this.subregion,
    [this.formFields.city]: this.city,
    [this.formFields.district]: this.district,
    [this.formFields.postal_code]: this.postal,
    [this.formFields.address]: this.address,
    [this.formFields.timezone]: this.timezone,
    [this.formFields.is_default]: this.isDefault,
  });

  private _item: Partial<UserLocation> = {};

  constructor(
    protected readonly timezoneService: TimezoneService,
    public readonly fullLocationService: FullLocationService,
    private readonly destroy$: NgDestroyService,
  ) {
    this.setTimezoneFromCity();
  }

  public get item(): Partial<UserLocation> {
    return this._item;
  }

  @Input()
  public set item(item: Partial<UserLocation>) {
    this._item = item;
    if (item) {
      const { timezone, ...itemWithoutTimezone } = item;
      this.fullLocationService
        .getFullLocation(itemWithoutTimezone)
        .pipe(takeUntil(this.destroy$))
        .subscribe(fullLocation => {
          this.form.patchValue({
            ...itemWithoutTimezone,
            ...fullLocation,
            [this.formFields.is_default]: itemWithoutTimezone.is_default,
          });
          if (item.is_default) {
            this.isDefault.disable();
          }
        });
    } else {
      this.form.patchValue({});
    }
  }

  public emitSave(): void {
    const test = this.transform(this.item);
    this.save.emit(test);
  }

  public emitDelete(): void {
    this.delete.emit(this.transform(this.item));
  }

  private transform(data: Partial<UserLocation>): UserLocation {
    // we should send null value explicitly, or Django doesn't update the value
    return {
      ...data,
      country: this.country.value?.id,
      region: this.region.value?.id ?? null,
      subregion: this.subregion.value?.id ?? null,
      city: this.city.value?.id,
      district: this.district.value?.id ?? null,
      postal_code: this.postal.value?.id ?? null,
      address: this.address.value,
      timezone: this.timezone.value?.value,
      is_default: this.isDefault.value,
    };
  }

  private setTimezoneFromCity(): void {
    this.timezoneList$
      .pipe(
        switchMap(timezoneList =>
          this.city.valueChanges.pipe(
            startWith(this.city.value),
            map(city => timezoneList?.find(fullTimezone => fullTimezone.value === city?.timezone)),
          ),
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(timezone => {
        if (timezone) {
          this.timezone.setValue(timezone, { emitEvent: false });
          this.timezone.disable({ emitEvent: false });
        } else {
          this.timezone.reset({ emitEvent: false });
          this.timezone.enable({ emitEvent: false });
        }
      });
  }
}
