import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Region, Subregion } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ItemSelectorControl } from '../item-selector-control';

const PAGE_SIZE = 1000;

@Component({
  selector: 'app-subregion-selector',
  templateUrl: '../item-selector-control.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubregionSelectorComponent),
      multi: true,
    },
  ],
})
export class SubregionSelectorComponent extends ItemSelectorControl<Subregion> {
  public items$: Observable<Subregion[]>;
  public title = 'location-edit-page.subregion';
  private readonly region$ = new BehaviorSubject<Region>(null);

  constructor(private readonly locationApi: LocationService) {
    super();
    this.hasData$ = this.region$.pipe(map(x => !!x));
    this.items$ = this.region$.pipe(
      switchMap(region =>
        region
          ? this.locationApi.locationSubregionsList({ pageSize: PAGE_SIZE, region: region.id })
          : of({ results: [] }),
      ),
      map(x => x.results),
    );
  }

  @Input()
  public set region(value: Region) {
    this.region$.next(value);
  }
}
