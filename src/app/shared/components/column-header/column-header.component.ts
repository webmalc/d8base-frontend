import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseUriString } from '@app/core/functions/uri.functions';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
})
export class ColumnHeaderComponent {
  @Input()
  public transparent: boolean = false;

  public backButtonLink$: Observable<string>;
  public backButtonParams$: Observable<object>;

  private readonly backButtonUrl$ = new BehaviorSubject<string>('');
  private readonly url$: Observable<{ path: string; queryParams?: object }>;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {
    if (!this.activatedRoute?.queryParamMap) {
      return;
    }
    this.url$ = combineLatest([this.activatedRoute.queryParamMap, this.backButtonUrl$]).pipe(
      map(([paramsMap, backButtonUrl]) => {
        const param = paramsMap.get('redirectTo');
        const redirectTo = param ? decodeURIComponent(param) : backButtonUrl;
        return parseUriString(redirectTo);
      }),
    );
    this.backButtonLink$ = this.url$.pipe(map(url => url.path));
    this.backButtonParams$ = this.url$.pipe(map(url => url.queryParams));
  }

  @Input()
  public set backButtonUrl(url: string) {
    this.backButtonUrl$.next(url);
  }

  public navigateBack(): void {
    this.url$.pipe(first()).subscribe(url => this.router.navigate([url.path], { queryParams: url.queryParams }));
  }
}
