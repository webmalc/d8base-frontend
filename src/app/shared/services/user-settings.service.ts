import {Injectable} from '@angular/core';
import {once} from '@app/core/decorators/once';
import {UserSettings} from '@app/core/models/user-settings';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {UserSettingsApiService} from '@app/core/services/user-settings-api.service';
import {Observable, of, ReplaySubject} from 'rxjs';
import {first, map, switchMap, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {

    public langList = ['en', 'ru'];
    public currencyList = ['CAD', 'EUR', 'RUB', 'USD'];
    public unitsList = [0, 1];
    public readonly userSettings$: Observable<UserSettings | null>;
    private readonly settings$: ReplaySubject<UserSettings | null> = new ReplaySubject<UserSettings | null>(1);
    private readonly STORAGE_KEY = 'user_settings';

    constructor(
        private readonly userSettingsApi: UserSettingsApiService,
        private readonly storage: StorageManagerService,
        private readonly auth: AuthenticationService
    ) {
        this.userSettings$ = this.settings$.asObservable();
    }

    @once
    public init(): void {
        this.pullUserSettings();
    }

    public setCurrency(currency: string): void {
        this.doRequest({currency});
    }

    public setUserAppLang(language: string): void {
        this.doRequest({language});
    }

    public setUnits(units: number): void {
        this.doRequest({units});
    }

    public setIsLastNameHidden(isLastNameHidden: boolean): void {
        this.doRequest({is_last_name_hidden: isLastNameHidden});
    }

    private doRequest(data: Partial<UserSettings>): void {
        this.settings$.pipe(
            first(),
            switchMap(
                settings => null === settings ?
                    this.createSettings(Object.assign(new UserSettings(), data)) :
                    this.patchSettings(Object.assign(settings, data))
            )).subscribe();
    }

    private patchSettings(data: UserSettings): Observable<UserSettings> {
        this.storage.set(this.STORAGE_KEY, data);

        return this.auth.isAuthenticated$.pipe(
            first(),
            switchMap(isAuth => isAuth ?
                this.userSettingsApi.patch(data).pipe(tap(model => this.settings$.next(model))) :
                of(data).pipe(tap(_ => this.settings$.next(data)))
            )
        );
    }

    private createSettings(data: UserSettings): Observable<UserSettings> {
        this.storage.set(this.STORAGE_KEY, data);

        return this.auth.isAuthenticated$.pipe(
            first(),
            switchMap(isAuth => isAuth ?
                this.userSettingsApi.create(data).pipe(tap(model => this.settings$.next(model))) :
                of(data).pipe(tap(_ => this.settings$.next(data)))
            )
        );
    }

    private pullUserSettings(): void {
        this.auth.isAuthenticated$.pipe(
            first(),
            map(isAuth => !isAuth ?
                this.pullFromStorage() :
                this.userSettingsApi.get()
                    .subscribe(res => 0 === res.count ? this.pullFromStorage() : this.settings$.next(res.results[0])))
        ).subscribe();
    }

    private pullFromStorage(): void {
        this.storage.get(this.STORAGE_KEY)
            .then(data => null === data ? this.settings$.next(this.getTemporaryDefaultSettings()) : this.settings$.next(data));
    }

    private getTemporaryDefaultSettings(): UserSettings {
        const model = new UserSettings();
        model.units = 0;
        model.currency = 'CAD';
        model.language = 'en';
        model.is_last_name_hidden = false;

        return model;
    }
}
