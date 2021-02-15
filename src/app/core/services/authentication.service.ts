import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { Credentials } from '@app/auth/interfaces/credentials';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import { CurrentUserSelectors } from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

/**
 *  Main authentication service
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public isAuthenticated$: Observable<boolean>;

  @Select(CurrentUserSelectors.tokens)
  public readonly tokens$: Observable<AuthResponseInterface>;

  constructor() {
    this.isAuthenticated$ = this.tokens$.pipe(
      filter(tokens => !!tokens),
      map(tokens => !!tokens.access_token),
      shareReplay(1),
    );
  }

  @Dispatch()
  public login(credentials: Credentials): CurrentUserActions.Login {
    return new CurrentUserActions.Login(credentials);
  }

  @Dispatch()
  public logout(): CurrentUserActions.Logout {
    return new CurrentUserActions.Logout();
  }

  @Dispatch()
  public authenticateWithToken(token: AuthResponseInterface): CurrentUserActions.AuthenticateWithToken {
    return new CurrentUserActions.AuthenticateWithToken(token);
  }
}
