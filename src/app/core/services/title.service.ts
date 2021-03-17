import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { getLastChild } from '@app/core/functions/navigation.functions';

@Injectable({ providedIn: 'root' })
export class TitleService {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly title: Title,
  ) {
    this.subscribeOnRouteChange();
  }

  private subscribeOnRouteChange(): void {
    const defaultTitle = this.title.getTitle();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const lastRoute = getLastChild(this.activatedRoute);
          return lastRoute.snapshot.data.title ?? defaultTitle;
        }),
      )
      .subscribe((title: string) => this.title.setTitle(title));
  }
}
