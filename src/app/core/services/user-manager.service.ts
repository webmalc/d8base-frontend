import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    private user: UserInterface;

    constructor(private http: HttpClient) {
    }

    public getUser(): Observable<any> {
        return this.http.get(environment.backend.url + environment.backend.user);
    }

    public updateUser(user: UserInterface): void {
    }

}
