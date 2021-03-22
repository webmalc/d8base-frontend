import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { map } from 'rxjs/operators';
import { ItemSelectorControl } from '../item-selector-control';

const PAGE_SIZE = 1000;

@Component({
  selector: 'app-country-selector',
  templateUrl: '../item-selector-control.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectorComponent),
      multi: true,
    },
  ],
})
export class CountrySelectorComponent extends ItemSelectorControl<Country> {
  public items$ = this.locationApi.locationCountriesList({ pageSize: PAGE_SIZE }).pipe(map(x => x.results));
  public title = 'location-edit-page.country';
  public required = true;
  constructor(private readonly locationApi: LocationService) {
    super();
  }
}
