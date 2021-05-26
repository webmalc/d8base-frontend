import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgDestroyService } from '@app/core/services';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { Coords } from '@app/shared/interfaces/coords';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { NavParams, PopoverController } from '@ionic/angular';
import { merge } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-on-map-popover',
  templateUrl: './on-map-popover.component.html',
  styleUrls: ['./on-map-popover.component.scss'],
  providers: [NgDestroyService],
})
export class OnMapPopoverComponent implements OnInit {
  public city = this.fb.control(null);
  public country = this.fb.control(null);
  public coordinates = this.fb.control(null);

  public data: SearchLocationDataInterface;
  public renderCountry: boolean = true;

  constructor(
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly citySelectable: SelectableCityOnSearchService,
    private readonly navParams: NavParams,
    private readonly popover: PopoverController,
    private readonly fb: FormBuilder,
    private readonly destroy$: NgDestroyService,
  ) {}

  public ngOnInit(): void {
    this.initData();
    this.subscribeControlChanges();
  }

  private subscribeControlChanges(): void {
    merge(this.city.valueChanges.pipe(filter(city => Boolean(city))), this.coordinates.valueChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const returnData: SearchLocationDataInterface = {
          city: this.city.value,
          country: this.country.value,
          coordinates: this.convertCoordsFromMap(this.coordinates.value?.coordinates),
        };

        this.popover.dismiss(returnData);
      });
  }

  private convertCoordsFromMap(mapCoords: number[]): Coords {
    let coords: Coords;

    if (mapCoords && mapCoords.length === 2) {
      coords = {
        latitude: mapCoords[1],
        longitude: mapCoords[0],
      };
    }

    return coords;
  }

  private convertCoordsToMap(coords: Coords): number[] {
    return coords ? [coords.longitude, coords.latitude] : null;
  }

  private initData(): void {
    const data = this.navParams.get<SearchLocationDataInterface>('data');
    this.country.setValue(data?.country, { emitEvent: false });
    this.city.setValue(data?.city, { emitEvent: false });
    this.coordinates.setValue(this.convertCoordsToMap(data?.coordinates), { emitEvent: false });

    if (this.navParams.get<boolean>('renderCountry') === false) {
      this.renderCountry = false;
    }
  }
}
