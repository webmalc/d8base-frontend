import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavQueryParams } from '@app/core/constants/navigation.constants';
import { WINDOW } from '@app/core/injection-tokens';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(
    private readonly navController: NavController,
    private readonly route: ActivatedRoute,
    @Inject(WINDOW) private readonly window: Window,
  ) {
    this.backButtonUrl$ = new BehaviorSubject<string>('');
    this.canGoBack$ = combineLatest([route.queryParamMap, this.backButtonUrl$]).pipe(
      map(([paramMap, url]) => paramMap.has(NavQueryParams.goBack) || Boolean(url)),
    );
  }

  public navigateBack(): void {
    this.willNavigateBack.emit();
    if (this.canGoBack()) {
      this.navController.back();
    } else if (this.backButtonUrl$.value) {
      this.navController.navigateBack(this.backButtonUrl$.value);
    }
  }

  private canGoBack(): boolean {
    return this.window.history.length > 1;
  }
}
