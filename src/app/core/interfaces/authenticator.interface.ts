import {Observable} from 'rxjs';
import {Credentials} from '@app/auth/interfaces/credentials';

export interface AuthenticatorInterface {
    login(credentials: Credentials): Observable<void>;
    refresh(): Observable<void>;
    isAuthenticated(): Promise<boolean>;
    logout(): Promise<any>;
    needToRefresh(): Promise<boolean>;
    getUserId(): Observable<number>;
}
