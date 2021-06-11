import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { environment } from '@env/environment';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable()
export class LangInterceptorService implements HttpInterceptor {
  @Select(CurrentUserSelectors.language)
  public readonly language$: Observable<string>;

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const url = new URL(req.url);
      if (url.origin !== environment.backend.url) {
        return next.handle(req);
      }
    } catch (e) {
      return next.handle(req);
    }
    if (this.getExcludedUrls().includes(req.url)) {
      return next.handle(req);
    }

    return this.language$.pipe(
      first(language => Boolean(language)),
      switchMap(language => {
        const url = new URL(req.url);
        const lang = language;
        const newUrl = `${url.origin}/${lang}${url.pathname}`;
        const headers = req.headers.append('Accept-Language', lang);

        return next.handle(req.clone({ url: newUrl, headers }));
      }),
    );
  }

  private getExcludedUrls(): string[] {
    return [
      environment.backend.url + environment.backend.auth,
      environment.backend.url + environment.backend.refresh,
      environment.backend.url + environment.backend.user_settings,
      environment.backend.url + environment.backend.user,
    ];
  }
}
