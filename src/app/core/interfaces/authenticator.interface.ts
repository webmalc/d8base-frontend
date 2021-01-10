import { Credentials } from '@app/auth/interfaces/credentials';
import { Observable } from 'rxjs';

export interface AuthenticatorInterface {
  isAuthenticated$: Observable<boolean>;

  login(credentials: Credentials): Observable<void>;

  logout(): Observable<any>;

  refresh(): Observable<void>;

  needToRefresh(): Observable<boolean>;
}
