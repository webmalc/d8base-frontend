import { Injectable } from '@angular/core';
import { GrantTypes } from '@app/auth/enums/grant-types';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { Credentials } from '@app/auth/interfaces/credentials';
import { LoginDataInterface } from '@app/core/interfaces/login-data-interface';
import { RefreshDataInterface } from '@app/core/interfaces/refresh-data-interface';
import { ApiClientService } from '@app/core/services/api-client.service';
import { PreLogoutService } from '@app/core/services/pre-logout.service';
import { TokenManagerService } from '@app/core/services/token-manager.service';
import { environment } from '@env/environment';
import { BehaviorSubject, EMPTY, from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

/**
 *  Main authentication service
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public readonly isAuthenticated$: Observable<boolean>;

  private readonly isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_OBTAIN_URL = environment.backend.auth;
  private readonly TOKEN_REFRESH_URL = environment.backend.refresh;

  constructor(
    private readonly tokenManager: TokenManagerService,
    private readonly client: ApiClientService,
    private readonly preLogout: PreLogoutService,
  ) {
    this.isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
    this.tokenManager.getAccessToken().then(
      token => this.isAuthenticatedSubject$.next(Boolean(token)),
    );
  }

  public get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject$.value;
  }

  public login({ username, password }: Credentials): Observable<void> {
    return this.client.post<AuthResponseInterface, LoginDataInterface>(this.TOKEN_OBTAIN_URL, {
      username,
      password,
      grant_type: GrantTypes.PasswordGrantType,
      client_id: environment.client_id,
      client_secret: environment.client_secret,
    }).pipe(
      switchMap(result => from(this.tokenManager.setTokens(result))),
      tap(() => this.isAuthenticatedSubject$.next(true)),
    );
  }

  public logout(): Observable<void> {
    return from(this.preLogout.run()
      .then(() => this.tokenManager.clear())
      .then(() => this.isAuthenticatedSubject$.next(false)));
  }

  public authenticateWithToken(token: AuthResponseInterface): Promise<void> {
    return this.tokenManager.setTokens(token).then(_ => this.isAuthenticatedSubject$.next(true));
  }

  public refresh(): Observable<void> {
    return new Observable<void>(
      (subscriber) => {
        this.tokenManager.getRefreshToken().then(refresh => {
          const refreshData: RefreshDataInterface = { refresh_token: refresh, grant_type: GrantTypes.RefreshGrantType };
          this.client.post<AuthResponseInterface, RefreshDataInterface>(this.TOKEN_REFRESH_URL, refreshData).subscribe(
            (response: AuthResponseInterface) => this.tokenManager.setTokens(response).then(
              _ => {
                subscriber.next();
                subscriber.complete();
              },
            ),
            _ => EMPTY,
          );
        }).catch(err => subscriber.error(err));
      },
    );
  }
}
