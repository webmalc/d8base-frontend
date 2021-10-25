import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavQueryParams } from '@app/core/constants/navigation.constants';
import { WINDOW } from '@app/core/injection-tokens';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.scss'],
})
export class ColumnHeaderComponent {
  @Input()
  public set backButtonUrl(value: string) {
    this.backButtonUrl$.next(value);
  }

  @Input()
  public customDiscardButton: boolean = false;

  @Input()
  public customBackButton: boolean = false;

  @Output()
  public willNavigateBack = new EventEmitter<void>();

  @Output()
  public discard = new EventEmitter<void>();

  @Output()
  public back = new EventEmitter<void>();

  public canGoBack$: Observable<boolean>;

  private readonly backButtonUrl$: BehaviorSubject<string>;
  private readonly preferHistory$: Observable<boolean>;

  constructor(
    private readonly navController: NavController,
    private readonly route: ActivatedRoute,
    @Inject(WINDOW) private readonly window: Window,
  ) {
    this.backButtonUrl$ = new BehaviorSubject<string>('');
    // TODO improve ActivatedRoute mock in tests
    this.preferHistory$ = route.queryParamMap?.pipe(map(paramMap => paramMap.has(NavQueryParams.goBack))) ?? of(false);
    this.canGoBack$ = combineLatest([this.preferHistory$, this.backButtonUrl$]).pipe(
      map(([preferHistory, url]) => preferHistory || Boolean(url)),
    );
  }

  public navigateBack(): void {
    this.willNavigateBack.emit();
    combineLatest([this.preferHistory$, this.backButtonUrl$])
      .pipe(first())
      .subscribe(([preferHistory, backButtonUrl]) => {
        if (preferHistory && this.hasHistory()) {
          this.navController.back();
        } else if (backButtonUrl) {
          this.navController.navigateBack(backButtonUrl);
        }
      });
  }

  private hasHistory(): boolean {
    return this.window.history.length > 1;
  }
}
