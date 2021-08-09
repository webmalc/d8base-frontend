import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parseUriString } from '@app/core/functions/uri.functions';
import { NgDestroyService } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
  providers: [NgDestroyService],
})
export class ColumnHeaderComponent {
  @Input()
  public previousLocationFallback: string;

  @Input()
  public transparent: boolean = false;

  public backButtonLink: string;
  public backButtonParams: object;

  constructor(private readonly activatedRoute: ActivatedRoute, ngDestroy$: NgDestroyService) {
    if (!this.activatedRoute?.queryParamMap) {
      return;
    }
    this.activatedRoute.queryParamMap.pipe(takeUntil(ngDestroy$)).subscribe(paramsMap => {
      const param = paramsMap.get('redirectTo');
      const redirectTo = param ? decodeURIComponent(param) : this.previousLocationFallback;
      const { path, queryParams } = parseUriString(redirectTo);
      this.backButtonParams = queryParams;
      this.backButtonLink = path;
    });
  }
}
