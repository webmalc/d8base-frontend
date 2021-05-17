import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '@app/api/models';
import { CountriesApiCache } from '@app/core/services/cache';
import { ItemSelectorControl } from '../item-selector-control';

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
  public items$ = this.countriesApi.list();
  @Input() public title = 'location-edit-page.country';
  @Input() public required = true;
  constructor(private readonly countriesApi: CountriesApiCache) {
    super();
  }
}
