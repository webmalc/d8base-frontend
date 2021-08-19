import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parseUriString } from '@app/core/functions/uri.functions';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private readonly activatedRoute: ActivatedRoute) {
    if (!this.activatedRoute?.queryParamMap) {
      return;
    }
    const url$ = combineLatest([this.activatedRoute.queryParamMap, this.backButtonUrl$]).pipe(
      map(([paramsMap, backButtonUrl]) => {
        const param = paramsMap.get('redirectTo');
        const redirectTo = param ? decodeURIComponent(param) : backButtonUrl;
        return parseUriString(redirectTo);
      }),
    );
    this.backButtonLink$ = url$.pipe(map(url => url.path));
    this.backButtonParams$ = url$.pipe(map(url => url.queryParams));
  }

  @Input()
  public set backButtonUrl(url: string) {
    this.backButtonUrl$.next(url);
  }
}
