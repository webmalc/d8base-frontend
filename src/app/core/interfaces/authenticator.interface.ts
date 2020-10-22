import {Credentials} from '@app/auth/interfaces/credentials';
import {BehaviorSubject, Observable} from 'rxjs';

export interface AuthenticatorInterface {
    isAuthenticated$: Observable<boolean>;
    login(credentials: Credentials): Observable<void>;
    refresh(): Observable<void>;
    isAuthenticated(): Observable<boolean>;
    logout(): Promise<any>;
    needToRefresh(): Promise<boolean>;
}
