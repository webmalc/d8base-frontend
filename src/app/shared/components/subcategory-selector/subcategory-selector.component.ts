import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category, Subcategory } from '@app/api/models';
import { LocationService, ProfessionalsService } from '@app/api/services';
import { normalizeString } from '@app/core/functions/string.functions';
import { NgDestroyService } from '@app/core/services';
import { IonicSelectableComponent } from 'ionic-selectable';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ItemSelectorControl } from '../location-editor/item-selector-control';

const ITEM_HEIGHT = 47;

@Component({
  selector: 'app-subcategory-selector',
  templateUrl: './subcategory-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubcategorySelectorComponent),
      multi: true,
    },
    NgDestroyService,
  ],
})
export class SubcategorySelectorComponent extends ItemSelectorControl<Subcategory> {
  public items$: Observable<Subcategory[]>;
  public items: Subcategory[];
  @Input() public title = 'subcategory';
  @Input()
  public set category(value: Category) {
    this.category$.next(value);
  }
  @Input() public required = false;
  @Input() public itemClass: string;
  @ViewChild('selectableComponent') public selectableComponent: IonicSelectableComponent;

  private readonly category$ = new BehaviorSubject<Category>(null);
  private readonly search$ = new BehaviorSubject<string>('');
  private readonly loadMore$ = new BehaviorSubject<boolean>(false);
  private pageCounter: number = 1;

  constructor(
    private readonly professionalsService: ProfessionalsService,
    private readonly cd: ChangeDetectorRef,
    private readonly destroy$: NgDestroyService,
  ) {
    super();
    this.hasData$ = this.category$.pipe(map(x => !!x));
    this.subscribeToCategory();
  }

  public search(event: { component: IonicSelectableComponent; text: string }): void {
    const { text } = event;
    this.search$.next(text);
  }

  public loadMore(): void {
    this.loadMore$.next(true);
  }

  private subscribeToCategory(): void {
    this.category$
      .pipe(
        filter(category => Boolean(category)),
        switchMap(category => {
          if (!this.isSubcategoryInCategory(category?.id)) {
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

              let params: ProfessionalsService.ProfessionalsSubcategoriesListParams = {
                category: category.id,
              };

              if (!search) {
                params = { ...params };
              } else {
                params = { ...params, search: normalizeString(search) };
              }

              return this.loadMore$.pipe(
                concatMap(() => this.professionalsService.professionalsSubcategoriesList({ ...params, page: this.pageCounter })),
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

  private isSubcategoryInCategory(categoryId: Category['id']): boolean {
    return categoryId === this.initialValue?.category;
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

  private appendItems(itemsAddition: Subcategory[]): void {
    this.items = this.items.concat(itemsAddition);
  }

  private disableInfiniteScroll(disable: boolean = true) {
    // BUG ionic-selectable does not disable infinite scroll by disableInfiniteScroll();
    this.selectableComponent.hasInfiniteScroll = !disable;
    if (disable) {
      this.selectableComponent.disableInfiniteScroll();
    } else {
      this.selectableComponent.enableInfiniteScroll();
    }
  }
}
