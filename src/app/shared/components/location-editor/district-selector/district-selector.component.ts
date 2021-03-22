import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { City, District } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ItemSelectorControl } from '../item-selector-control';

const PAGE_SIZE = 1000;

@Component({
  selector: 'app-district-selector',
  templateUrl: '../item-selector-control.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DistrictSelectorComponent),
      multi: true,
    },
  ],
})
export class DistrictSelectorComponent extends ItemSelectorControl<District> {
  public items$: Observable<District[]>;
  public title ='location-edit-page.district';
  private readonly city$ = new BehaviorSubject<City>(null);

  constructor(private readonly locationApi: LocationService) {
    super();
    this.items$ = this.city$.pipe(
      switchMap(city => city
        ? this.locationApi.locationDistrictsList({ pageSize: PAGE_SIZE, city: `${city.id}` })
        : of({ results: [] }),
      ),
      map(x => x.results),
    );
  }

  @Input()
  public set city(value: City) {
    this.city$.next(value);
  }
}
