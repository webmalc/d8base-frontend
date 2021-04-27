import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLocation } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { HelperService } from '@app/core/services/helper.service';
import { FullLocationService } from '@app/core/services/location/full-location.service';
import { TimezoneService } from '@app/core/services/timezone.service';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
}

interface Timezone {
  value: string;
  display_name: string;
}

@Component({
  selector: 'app-location-editor',
  templateUrl: './location-editor.component.html',
  styleUrls: ['./location-editor.component.scss'],
  providers: [NgDestroyService],
})
export class LocationEditorComponent implements OnInit {
  @Output() public save = new EventEmitter<UserLocation>();
  @Output() public delete = new EventEmitter<UserLocation>();

  public readonly formFields = LocationFormFields;
  public timezoneList$ = new BehaviorSubject<Timezone[]>(null);
  public form: FormGroup = this.fb.group({
    [this.formFields.country]: [null, Validators.required],
    [this.formFields.region]: [{ value: null, disabled: true }],
    [this.formFields.subregion]: [{ value: null, disabled: true }],
    [this.formFields.city]: [{ value: null, disabled: true }, Validators.required],
    [this.formFields.district]: [{ value: null, disabled: true }],
    [this.formFields.coordinates]: [null],
    [this.formFields.postal_code]: [null],
    [this.formFields.address]: [null],
    [this.formFields.timezone]: [null],
  });

  private _item: Partial<UserLocation> = {};

  constructor(
    protected readonly location: Location,
    protected readonly timezone: TimezoneService,
    public readonly fullLocationService: FullLocationService,
    public readonly fb: FormBuilder,
    private readonly $ngDestroy: NgDestroyService,
  ) {}

  public get item(): Partial<UserLocation> {
    return this._item;
  }

  @Input()
  public set item(item: Partial<UserLocation>) {
    this._item = item;
    if (item) {
      this.fullLocationService.getFullLocation(item).subscribe(fullLocation => {
        this.form.patchValue({ ...item, ...fullLocation });
      });
    } else {
      this.form.patchValue({});
    }
  }

  public ngOnInit(): void {
    this.handleControls();
    this.timezone.getTimezoneList().subscribe(data => this.timezoneList$.next(data));
  }

  public emitSave(): void {
    this.save.emit(this.transform(this.item));
  }

  public emitDelete(): void {
    this.delete.emit(this.transform(this.item));
  }

  protected transform(data: any): UserLocation {
    const model = { ...data, ...this.form.value };

    [
      this.formFields.country,
      this.formFields.region,
      this.formFields.subregion,
      this.formFields.city,
      this.formFields.district,
    ].forEach((field: string) => {
      model[field] = this.form.value[field]?.id ?? undefined;
    });

    [this.formFields.timezone, 'is_default'].forEach(field => {
      model[field] = this.form.value[field]?.value ?? undefined;
    });

    return HelperService.clear<UserLocation>(model);
  }

  private handleControls(): void {
    this.handleDependentControls(this.formFields.country, [this.formFields.region, this.formFields.city]);
    this.handleDependentControls(this.formFields.region, [this.formFields.subregion]);
    this.handleDependentControls(this.formFields.city, [this.formFields.district]);
  }

  private handleDependentControls(control: string, dependentControls: string[]): void {
    this.form
      .get(control)
      .valueChanges.pipe(takeUntil(this.$ngDestroy))
      .subscribe(value => {
        const action = !value ? 'disable' : 'enable';
        dependentControls.forEach(control => {
          this.form.get(control)[action]();
          this.form.get(control).reset();
        });
      });
  }
}
