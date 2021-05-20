import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { City, Country } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { IonicSelectableComponent } from 'ionic-selectable';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ItemSelectorControl } from '../item-selector-control';

const ITEM_HEIGHT = 47;

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CitySelectorComponent),
      multi: true,
    },
    NgDestroyService,
  ],
})
export class CitySelectorComponent extends ItemSelectorControl<City> {
  public items$: Observable<City[]>;
  public items: City[];
  @Input() public title = 'location-edit-page.city';
  @Input()
  public set country(value: Country) {
    this.country$.next(value);
  }
  @Input() public required = false;
  @Input() public itemClass: string;
  @ViewChild('selectableComponent') public selectableComponent: IonicSelectableComponent;

  private readonly country$ = new BehaviorSubject<Country>(null);
  private readonly search$ = new BehaviorSubject<string>('');
  private readonly loadMore$ = new BehaviorSubject<boolean>(false);
  private pageCounter: number = 1;

  constructor(
    private readonly locationApi: LocationService,
    private readonly cd: ChangeDetectorRef,
    private readonly destroy$: NgDestroyService,
  ) {
    super();
    this.hasData$ = this.country$.pipe(map(x => !!x));
    this.subscribeToCountry();
  }

  public search(event: { component: IonicSelectableComponent; text: string }): void {
    const { text } = event;
    this.search$.next(text);
  }

  public loadMore(): void {
    this.loadMore$.next(true);
  }

  private subscribeToCountry(): void {
    this.country$
      .pipe(
        filter(country => Boolean(country)),
        switchMap(country => {
          if (!this.isCityInCountry(country?.id)) {
            this.resetValue();
          }

          return this.search$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(search => {
              this.resetPageCounter();
              this.disableInfiniteScroll();
              this.resetItems();
              this.selectableComponent.startSearch();

              let params: LocationService.LocationCitiesListParams = {
                country: `${country.id}`,
              };

              if (!search) {
                params = { ...params, ordering: '-population' };
              } else {
                params = { ...params, byName: this.prepareTextToSearch(search) };
              }

              return this.loadMore$.pipe(
                concatMap(() => this.locationApi.locationCitiesList({ ...params, page: this.pageCounter })),
              );
            }),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: paginatedResult => {
          const { results, next, previous } = paginatedResult;

          this.incrementPageCounter();
          this.disableInfiniteScroll(!next);
          this.appendItems(results);

          if (previous) {
            this.selectableComponent._modalComponent._content.scrollY = false;
            this.selectableComponent.endInfiniteScroll();

            // BUG ionic selectable resets scroll to top after infinite loading
            setTimeout(() => {
              this.selectableComponent._modalComponent._content.scrollY = true;
              this.selectableComponent._modalComponent._content.scrollToBottom();
              this.selectableComponent._modalComponent._content.scrollByPoint(0, -(results.length * ITEM_HEIGHT), 0);
            });
          } else {
            this.selectableComponent.endSearch();
          }

          this.cd.markForCheck();
        },
        error: () => {
          this.selectableComponent.endSearch();
          this.cd.markForCheck();
        },
        complete: () => {
          this.selectableComponent.endSearch();
          this.cd.markForCheck();
        },
      });
  }

  private isCityInCountry(countryId: Country['id']): boolean {
    return countryId === this.initialValue?.country;
  }

  private prepareTextToSearch(text: string): string {
    return text.trim().toLowerCase();
  }

  private resetPageCounter(): void {
    this.pageCounter = 1;
  }

  private incrementPageCounter(): void {
    this.pageCounter += 1;
  }

  private resetItems(): void {
    this.items = [];
  }

  private resetValue(): void {
    this.change({ component: this.selectableComponent, value: void 0 });
  }

  private appendItems(itemsAddition: City[]): void {
    this.items = this.items.concat(itemsAddition);
  }

  private disableInfiniteScroll(disable: boolean = true) {
    if (disable) {
      this.selectableComponent.disableInfiniteScroll();
    } else {
      this.selectableComponent.enableInfiniteScroll();
    }
  }
}
