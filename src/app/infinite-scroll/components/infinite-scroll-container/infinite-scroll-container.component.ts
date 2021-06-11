import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgDestroyService } from '@app/core/services';
import { InfiniteScrollItemDirective } from '@app/infinite-scroll/directives/infinite-scroll-item.directive';
import { InfiniteScrollData, PaginatedResult, Params } from '@app/infinite-scroll/models/infinite-scroll.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, concatMap, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-infinite-scroll-container',
  templateUrl: './infinite-scroll-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroyService],
})
export class InfiniteScrollContainerComponent<T> {
  public get results(): T[] {
    return this._results ?? [];
  }
  public set results(value: T[]) {
    this._results = value;
    this.loadResults.emit(this.results);
  }

  public isLoading: boolean = false;
  public wasLoadAttempted: boolean = false;
  @Input() public set doLoad$(value: Observable<InfiniteScrollData<Params, T>>) {
    const value$ = value?.pipe(
      switchMap(data => {
        const { params, apiRequestFunction } = data;

        this.resetPageCounter();
        this.disableInfiniteScroll();
        this.showSpinner();
        this.wasLoadAttempted = true;

        this.resetResults();

        return this.loadMore$.pipe(
          concatMap((infiniteScroll?) => {
            this.cd.markForCheck();
            return apiRequestFunction({ ...params, page: this.pageCounter }).pipe(
              tap(() => {
                if (infiniteScroll) {
                  infiniteScroll.target.complete();
                }
              }),
            );
          }),
        );
      }),
      catchError(() => {
        this.hideSpinner();
        this.cd.markForCheck();
        return value$;
      }),
      takeUntil(this.destroy$),
    );

    value$.subscribe((paginatedResult: PaginatedResult<T>) => {
      const { results, next } = paginatedResult;

      this.incrementPageCounter();
      this.disableInfiniteScroll(!next);
      this.hideSpinner();

      this.appendResults(results);

      this.cd.markForCheck();
    });
  }
  @Input() public emptyText: string;
  @Output() public loadResults = new EventEmitter<T[]>();

  public results$: Observable<T[]>;
  public loadMore$: BehaviorSubject<any> = new BehaviorSubject(false);

  @ContentChild(InfiniteScrollItemDirective, { static: false, read: TemplateRef })
  public readonly infiniteScrollItem: TemplateRef<any> | null = null;

  @ViewChild(IonInfiniteScroll) private readonly infiniteScroll: IonInfiniteScroll;

  private pageCounter: number = 1;
  private _results: T[];

  constructor(private readonly destroy$: NgDestroyService, private readonly cd: ChangeDetectorRef) {}

  public loadMore(infiniteScroll?): void {
    this.loadMore$.next(infiniteScroll);
  }

  private disableInfiniteScroll(disabled: boolean = true) {
    this.infiniteScroll.disabled = disabled;
  }

  private resetResults(): void {
    this.results = [];
  }

  private appendResults(resultAddition: T[]): void {
    this.results = this.results.concat(resultAddition);
  }

  private resetPageCounter(): void {
    this.pageCounter = 1;
  }

  private incrementPageCounter(): void {
    this.pageCounter += 1;
  }

  private showSpinner(): void {
    this.isLoading = true;
  }

  private hideSpinner(): void {
    this.isLoading = false;
  }
}
