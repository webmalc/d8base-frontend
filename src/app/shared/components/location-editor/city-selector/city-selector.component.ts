import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { City, Country } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ItemSelectorControl } from '../item-selector-control';

const PAGE_SIZE = 1000;

@Component({
  selector: 'app-city-selector',
  templateUrl: '../item-selector-control.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CitySelectorComponent),
      multi: true,
    },
  ],
})
export class CitySelectorComponent extends ItemSelectorControl<City> {
  public items$: Observable<City[]>;
  public title ='location-edit-page.city';
  public required = true;
  private readonly country$ = new BehaviorSubject<Country>(null);

  constructor(private readonly locationApi: LocationService) {
    super();
    this.items$ = this.country$.pipe(
      switchMap(country => country
        ? this.locationApi.locationCitiesList({ pageSize: PAGE_SIZE, country: `${country.id}` })
        : of({ results: [] }),
      ),
      map(x => x.results),
    );
  }

  @Input()
  public set country(value: Country) {
    this.country$.next(value);
  }
}
