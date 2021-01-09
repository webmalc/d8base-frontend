import { Component, OnInit } from '@angular/core';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { Country } from '@app/profile/models/country';
import { Coordinates } from '@app/shared/interfaces/coordinates';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { NavParams, PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-on-map-popover',
  templateUrl: './on-map-popover.component.html',
  styleUrls: ['./on-map-popover.component.scss'],
})
export class OnMapPopoverComponent implements OnInit {

  public isCityEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public data: SearchLocationDataInterface;
  public renderCountry: boolean = true;
  public mapCoords: Coordinates;

  constructor(
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly citySelectable: SelectableCityOnSearchService,
    private readonly navParams: NavParams,
    private readonly popover: PopoverController,
  ) {
  }

  public formatCoords(): number[] {
    return this.data.coordinates ? [this.data.coordinates.longitude, this.data.coordinates.latitude] : null;
  }

  public ngOnInit(): void {
    this.data = this.navParams.get<SearchLocationDataInterface>('data');
    if (this.navParams.get<boolean>('renderCountry') === false) {
      this.renderCountry = false;
    }
    this.isCityEnabled$.next(this.data?.country && true);
  }

  public getCountryValue(): Country {
    return this.data?.country as Country;
  }

  public onCountryChange(): void {
    this.data.city = undefined;
    this.isCityEnabled$.next(true);
  }

  public emit(data: Coordinates): void {
    if (data.coordinates && data.coordinates.length === 2) {
      this.data.coordinates = {
        latitude: data.coordinates[1],
        longitude: data.coordinates[0],
      };
    } else {
      this.data.coordinates = undefined;
    }
    this.popover.dismiss(this.data);
  }

  public emitByCity(): void {
    if (this.mapCoords?.coordinates && this.mapCoords.coordinates.length === 2) {
      this.data.coordinates = {
        latitude: this.mapCoords.coordinates[1],
        longitude: this.mapCoords.coordinates[0],
      };
    } else {
      this.data.coordinates = undefined;
    }
    this.popover.dismiss(this.data);
  }
}
