import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserSettingsService} from '@app/shared/services/user-settings.service';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';

@Injectable()
export class LangInterceptorService implements HttpInterceptor {

    constructor(private readonly settings: UserSettingsService) {
    }

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

        return this.settings.userSettings$.pipe(
            first(),
            switchMap(settings => {
                const url = new URL(req.url);
                const lang = settings?.language || environment.default_lang;
                const newUrl = `${url.origin}/${lang}${url.pathname}`;
                const headers = req.headers.append('Accept-Language', lang);

                return next.handle(req.clone({url: newUrl, headers}));
            }),
        );
    }

    private getExcludedUrls(): string[] {
        return [
            environment.backend.url + environment.backend.auth,
            environment.backend.url + environment.backend.refresh,
        ];
    }
}
