import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PostalCode } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ItemSelectorControl } from '../item-selector-control';

const PAGE_SIZE = 1000;

@Component({
  selector: 'app-postal-code-selector',
  templateUrl: './postal-code-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PostalCodeSelectorComponent),
      multi: true,
    },
  ],
})
export class PostalCodeSelectorComponent extends ItemSelectorControl<PostalCode> {
  public items$: Observable<PostalCode[]>;

  @Input() public title = 'location-edit-page.postal-code';
  @Input() public required = false;
  @Input() public itemClass: string;
  @Input() public isMultiple: boolean = false;

  private readonly countryId$ = new BehaviorSubject<number>(null);
  private readonly cityId$ = new BehaviorSubject<number>(null);

  constructor(private readonly locationApi: LocationService) {
    super();
    this.hasData$ = combineLatest([this.countryId$, this.cityId$]).pipe(
      map(([countryId, cityId]) => !!countryId && !!cityId),
    );
    this.items$ = combineLatest([this.countryId$, this.cityId$]).pipe(
      switchMap(([countryId, cityId]) =>
        !!countryId && !!cityId
          ? this.locationApi.locationPostalCodesList({
              pageSize: PAGE_SIZE,
              country: `${countryId}`,
              city: `${cityId}`,
            })
          : of({ results: [] }),
      ),
      map(x => x.results),
    );
  }

  @Input()
  public set countryId(value: number) {
    this.countryId$.next(value);
  }

  @Input()
  public set cityId(value: number) {
    this.cityId$.next(value);
  }
}
