import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country, Region } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ItemSelectorControl } from '../item-selector-control';

const PAGE_SIZE = 1000;

@Component({
  selector: 'app-region-selector',
  templateUrl: '../item-selector-control.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegionSelectorComponent),
      multi: true,
    },
  ],
})
export class RegionSelectorComponent extends ItemSelectorControl<Region> {
  public items$: Observable<Region[]>;
  public title = 'location-edit-page.region';
  private readonly country$ = new BehaviorSubject<Country>(null);

  constructor(private readonly locationApi: LocationService) {
    super();
    this.items$ = this.country$.pipe(
      switchMap(country => country
        ? this.locationApi.locationRegionsList({ pageSize: PAGE_SIZE, country: country.id })
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
