import { Injectable } from '@angular/core';
import { once } from '@app/core/decorators/once';
import { UserSettings } from '@app/core/models/user-settings';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserSettingsApiService } from '@app/core/services/user-settings-api.service';
import { environment } from '@env/environment';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {

  public langList = ['en', 'ru'];
  public currencyList = ['CAD', 'EUR', 'RUB', 'USD'];
  public unitsList = [0, 1];
  public readonly userSettings$: Observable<UserSettings | null>;
  private readonly settings$: BehaviorSubject<UserSettings | null> = new BehaviorSubject<UserSettings | null>(null);
  private readonly storageKey = 'user_settings';

  constructor(
    private readonly userSettingsApi: UserSettingsApiService,
    private readonly storage: StorageManagerService,
    private readonly auth: AuthenticationService,
  ) {
    this.userSettings$ = this.settings$.asObservable();
  }

  @once
  public init(): Promise<any> {
    return this.pullUserSettings().toPromise();
  }

  public setCurrency(currency: string): void {
    this.userSettings$.pipe(
      first(),
      switchMap(settings => settings && (settings.currency !== currency) ? this.doRequest({ currency }) : of()),
    ).subscribe();
  }

  public setUserAppLang(language: string): void {
    this.userSettings$.pipe(
      first(),
      switchMap(settings => settings && (settings.language !== language) ? this.doRequest({ language }) : of()),
    ).subscribe();
  }

  public setUnits(units: number): void {
    this.userSettings$.pipe(
      first(),
      switchMap(settings => settings && (settings.units !== units) ? this.doRequest({ units }) : of()),
    ).subscribe();
  }

  public setIsLastNameHidden(isLastNameHidden: boolean): void {
    this.userSettings$.pipe(
      first(),
      switchMap(settings => settings && (settings.is_last_name_hidden !== isLastNameHidden) ?
        this.doRequest({ is_last_name_hidden: isLastNameHidden }) :
        of(),
      ),
    ).subscribe();
  }

  private doRequest(data: Partial<UserSettings>): Observable<UserSettings> {
    return this.getFromApi().pipe(
      switchMap(settings => null === settings ? this.getLocalSettings() : of(settings)),
      switchMap(settings => !settings.id ?
        this.createSettings(Object.assign(settings, data)) :
        this.patchSettings(Object.assign(settings, data)),
      ),
    );
  }

  private patchSettings(data: UserSettings): Observable<UserSettings> {
    return this.auth.isAuthenticated$.pipe(
      first(),
      switchMap(isAuth => isAuth ? this.userSettingsApi.patch(data) : of(data)),
      tap(settings => this.setSettings(settings)),
    );
  }

  private createSettings(data: UserSettings): Observable<UserSettings> {
    return this.auth.isAuthenticated$.pipe(
      first(),
      switchMap(isAuth => isAuth ? this.userSettingsApi.create(data) : of(data)),
      tap(settings => this.setSettings(settings)),
    );
  }

  private pullUserSettings(): Observable<any> {
    return this.auth.isAuthenticated$.pipe(
      first(),
      switchMap(isAuth => !isAuth ? this.getLocalSettings() : this.getFromApi()),
      switchMap(res => null === res ? this.getLocalSettings() : of(res)),
      tap(data => this.setSettings(data)),
    );
  }

  private getLocalSettings(): Observable<UserSettings> {
    return this.userSettings$.pipe(
      first(),
      switchMap(settings => null === settings ? from(this.pullFromStorage()) : of(settings)),
    );
  }

  private setSettings(settings: UserSettings): void {
    this.settings$.next(this.clearUserSettings(settings));
    this.storage.set(this.storageKey, this.clearUserSettings(settings));
  }

  private getFromApi(): Observable<UserSettings | null> {
    return this.userSettingsApi.get().pipe(
      map(res => 0 === res.count ? null : res.results[0]),
      catchError(_ => of(null)),
    );
  }

  private pullFromStorage(): Promise<UserSettings> {
    return this.storage.get(this.storageKey)
      .then(data => null === data ? this.getTemporaryDefaultSettings() : data);
  }

  private clearUserSettings(data: UserSettings): UserSettings {
    data.id = undefined;

    return data;
  }

  private getTemporaryDefaultSettings(): UserSettings {
    const model = new UserSettings();
    model.units = 0;
    model.currency = 'CAD';
    model.language = environment.default_lang;
    model.is_last_name_hidden = false;

    return model;
  }
}
