import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgDestroyService } from '@app/core/services';
import { InfiniteScrollItemDirective } from '@app/infinite-scroll/directives/infinite-scroll-item.directive';
import { InfiniteScrollData, PaginatedResult, Params } from '@app/infinite-scroll/models/infinite-scroll.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { asyncScheduler, Observable } from 'rxjs';
import { observeOn, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-infinite-scroll-container',
  templateUrl: './infinite-scroll-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroyService],
})
export class InfiniteScrollContainerComponent<T> implements OnInit {
  public results: T[];
  public isLoading: boolean = false;
  public wasLoadAttempted: boolean = false;
  @Input() public doLoad$: Observable<InfiniteScrollData<Params, T>>;
  @Input() public emptyText: string;
  @Output() public loadResults = new EventEmitter<T[]>();

  @ContentChild(InfiniteScrollItemDirective, { static: false, read: TemplateRef })
  public readonly infiniteScrollItem: TemplateRef<any> | null = null;

  @ViewChild(IonInfiniteScroll) private readonly infiniteScroll: IonInfiniteScroll;
  private requestParams: Params = {};
  private apiRequestFunction: (params: Params & { page: number }) => Observable<PaginatedResult<T>> = null;
  private pageCounter: number = 1;

  constructor(private readonly destroy$: NgDestroyService, private readonly cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.doLoad$?.pipe(observeOn(asyncScheduler), takeUntil(this.destroy$)).subscribe(data => {
      const { params, apiRequestFunction } = data;
      this.requestParams = params;
      this.apiRequestFunction = apiRequestFunction;

      this.isLoading = true;
      this.wasLoadAttempted = true;
      this.firstLoad();

      this.cd.markForCheck();
    });
  }

  public loadMore(infiniteScroll?): void {
    this.incrementPageCounter();
    this.loadData(infiniteScroll);
  }

  private firstLoad(): void {
    this.resetPageCounter();
    this.loadData();
  }

  private loadData(infiniteScroll?): void {
    this.apiRequestFunction({ ...this.requestParams, page: this.pageCounter })
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const { results, next } = response;
        this.results = this.results.concat(results);
        this.loadResults.emit(this.results);
        if (infiniteScroll) {
          infiniteScroll.target.complete();
        }
        this.disabelInfiniteScroll(!next);
        this.isLoading = false;
        this.cd.markForCheck();
      });
  }
  private disabelInfiniteScroll(disabled: boolean = true) {
    this.infiniteScroll.disabled = disabled;
  }

  private resetPageCounter(): void {
    this.pageCounter = 1;
    this.results = [];
    this.loadResults.emit(this.results);
  }

  private incrementPageCounter(): void {
    this.pageCounter += 1;
  }
}
