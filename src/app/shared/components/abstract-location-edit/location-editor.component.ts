import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalLocationInline } from '@app/api/models';
import { HelperService } from '@app/core/services/helper.service';
import { FullLocationService } from '@app/core/services/location/full-location.service';
import { TimezoneService } from '@app/core/services/timezone.service';
import { AbstractEditComponent } from '@app/shared/abstract/abstract-edit-component';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { SelectableDistrictOnSearchService } from '@app/shared/services/selectable-district-on-search.service';
import { SelectableRegionOnSearchService } from '@app/shared/services/selectable-region-on-search.service';
import { SelectableSubregionOnSearchService } from '@app/shared/services/selectable-subregion-on-search.service';
import { BehaviorSubject } from 'rxjs';

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

@Component({
  selector: 'app-location-editor',
  templateUrl: './location-editor.component.html',
  styleUrls: ['./location-editor.component.scss'],
})
export class LocationEditorComponent extends AbstractEditComponent<ClientLocationInterface> implements OnInit, OnChanges {
  public readonly formFields = LocationFormFields;
  @Input() public transformFn: (data: ClientLocationInterface) => ClientLocationInterface;
  public timezoneList$: BehaviorSubject<Array<{ value: string; display_name: string }>> = new BehaviorSubject<
    Array<{ value: string; display_name: string }>
  >(null);
  public isDistrictEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isRegionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isSubregionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isCityEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
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

  constructor(
    protected readonly location: Location,
    protected readonly timezone: TimezoneService,
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly citySelectable: SelectableCityOnSearchService,
    public readonly regionSelectable: SelectableRegionOnSearchService,
    public readonly selectableSubregion: SelectableSubregionOnSearchService,
    public readonly districtSelectable: SelectableDistrictOnSearchService,
    public readonly fullLocationService: FullLocationService,
    public readonly fb: FormBuilder,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.handleControls();
    this.timezone.getTimezoneList().subscribe(data => this.timezoneList$.next(data));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      if (this.item) {
        this.fullLocationService.getFullLocation((this.item as unknown) as ProfessionalLocationInline).subscribe(fullLocation => {
          this.form.patchValue({ ...this.item, ...fullLocation });
        });
      } else {
        this.form.patchValue({});
      }
    }
  }

  protected transform(data: any): ClientLocationInterface {
    const model = this.transformFn({ ...data, ...this.form.value });

    [this.formFields.country, this.formFields.region, this.formFields.subregion, this.formFields.city, this.formFields.district].forEach(
      (field: string) => {
        model[field] = this.form.value[field]?.id ?? undefined;
      },
    );

    [this.formFields.timezone, 'is_default'].forEach(field => {
      model[field] = this.form.value[field]?.value ?? undefined;
    });

    return HelperService.clear<ClientLocationInterface>(model);
  }

  private handleControls(): void {
    this.handleControlChanges(this.formFields.country, [this.formFields.region, this.formFields.city]);
    this.handleControlChanges(this.formFields.region, [this.formFields.subregion]);
    this.handleControlChanges(this.formFields.city, [this.formFields.district]);
  }

  private handleControlChanges(handledControl: string, controls: string[]): void {
    this.form.get(handledControl).valueChanges.subscribe(value => {
      const action = !value ? 'disable' : 'enable';
      controls.forEach(control => {
        this.form.get(control)[action]();
        this.form.get(control).reset();
      });
    });
  }
}
