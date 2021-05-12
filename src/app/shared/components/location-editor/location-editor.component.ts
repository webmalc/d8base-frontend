import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLocation } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { FullLocationService } from '@app/core/services/location/full-location.service';
import { TimezoneService } from '@app/core/services/timezone.service';
import { shareReplay, takeUntil } from 'rxjs/operators';

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
    this.handleControls();
  }

  public get item(): Partial<UserLocation> {
    return this._item;
  }

  @Input()
  public set item(item: Partial<UserLocation>) {
    this._item = item;
    if (item) {
      this.fullLocationService.getFullLocation(item).subscribe(fullLocation => {
        this.form.patchValue({ ...item, ...fullLocation, [this.formFields.is_default]: item.is_default });
        if (item.is_default) {
          this.isDefault.disable();
        }
      });
    } else {
      this.form.patchValue({});
    }
  }

  public emitSave(): void {
    this.save.emit(this.transform(this.item));
  }

  public emitDelete(): void {
    this.delete.emit(this.transform(this.item));
  }

  private transform(data: Partial<UserLocation>): UserLocation {
    return {
      ...data,
      country: this.country.value?.id,
      region: this.region.value?.id,
      subregion: this.subregion.value?.id,
      city: this.city.value?.id,
      district: this.district.value?.id,
      postal_code: this.postal.value?.id,
      address: this.address.value,
      timezone: this.timezone.value?.value,
      is_default: this.isDefault.value,
    };
  }

  private handleControls(): void {
    this.handleDependentControls(this.formFields.country, [this.formFields.region, this.formFields.city]);
    this.handleDependentControls(this.formFields.region, [this.formFields.subregion]);
    this.handleDependentControls(this.formFields.city, [this.formFields.district]);
  }

  private handleDependentControls(control: string, dependentControls: string[]): void {
    this.form
      .get(control)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        const action = !value ? 'disable' : 'enable';
        dependentControls.forEach(control => {
          this.form.get(control)[action]();
          this.form.get(control).reset();
        });
      });
  }
}
