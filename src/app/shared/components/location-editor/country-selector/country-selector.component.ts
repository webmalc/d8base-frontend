import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '@app/api/models';
import { CountriesApiCache } from '@app/core/services/cache';
import { ItemSelectorControl } from '../item-selector-control';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
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
  @Input() public required = false;
  @Input() public itemClass: string;
  @Input() public isMultiple: boolean = false;
  constructor(private readonly countriesApi: CountriesApiCache) {
    super();
  }
}
