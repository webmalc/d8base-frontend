import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Region } from '@app/core/models/region';
import { HelperService } from '@app/core/services/helper.service';
import { TimezoneService } from '@app/core/services/timezone.service';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { AbstractEditComponent } from '@app/shared/abstract/abstract-edit-component';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { SelectableDistrictOnSearchService } from '@app/shared/services/selectable-district-on-search.service';
import { SelectableRegionOnSearchService } from '@app/shared/services/selectable-region-on-search.service';
import { SelectableSubregionOnSearchService } from '@app/shared/services/selectable-subregion-on-search.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-abstract-location-edit',
  templateUrl: './abstract-location-edit.component.html',
  styleUrls: ['./abstract-location-edit.component.scss'],
})
export class AbstractLocationEditComponent extends AbstractEditComponent<ClientLocationInterface> implements OnInit {

  @Input() public transformFn: (data: ClientLocationInterface) => ClientLocationInterface;
  public timezoneList$: BehaviorSubject<Array<{ value: string, display_name: string }>> =
    new BehaviorSubject<Array<{ value: string, display_name: string }>>(null);
  public isDistrictEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isRegionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isSubregionEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isCityEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    protected readonly location: Location,
    protected readonly timezone: TimezoneService,
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly citySelectable: SelectableCityOnSearchService,
    public readonly regionSelectable: SelectableRegionOnSearchService,
    public readonly selectableSubregion: SelectableSubregionOnSearchService,
    public readonly districtSelectable: SelectableDistrictOnSearchService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.processDisabledFields(this.item);
    this.timezone.getTimezoneList().subscribe(
      data => this.timezoneList$.next(data),
    );
  }

  public locationBack(): void {
    this.location.back();
  }

  public onCityChange(): void {
    this.isDistrictEnabled$.next(true);
  }

  public onRegionChange(): void {
    this.isSubregionEnabled$.next(true);
  }

  public onCountryChange(): void {
    this.isCityEnabled$.next(true);
    this.isRegionEnabled$.next(true);
  }

  public getCountryValue(): Country {
    return this.item?.country as Country;
  }

  public getRegionValue(): Region {
    return this.item?.region as Region;
  }

  public getCityValue(): City {
    return this.item?.city as City;
  }

  protected transform(data: any): ClientLocationInterface {
    const model = this.transformFn(data);
    model.city = data.city?.id ?? undefined;
    model.country = data.country?.id ?? undefined;
    model.region = data.region?.id ?? undefined;
    model.subregion = data.subregion?.id ?? undefined;
    model.district = data.district?.id ?? undefined;
    model.timezone = data.timezone?.value ?? undefined;
    model.is_default = data.is_default?.value ?? undefined;

    return HelperService.clear<ClientLocationInterface>(model);
  }

  private processDisabledFields(location?: ClientLocationInterface): void {
    if (!this.item) {
      return;
    }
    if (!location?.country) {
      this.isCityEnabled$.next(false);
      this.isRegionEnabled$.next(false);
      this.isSubregionEnabled$.next(false);
      this.isDistrictEnabled$.next(false);
    }
    if (!location?.region) {
      this.isSubregionEnabled$.next(false);
    }
    if (!location?.city) {
      this.isDistrictEnabled$.next(false);
    }
  }
}
