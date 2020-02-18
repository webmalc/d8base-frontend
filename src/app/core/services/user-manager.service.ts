import {Injectable} from '@angular/core';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserManagerService {

    private user: UserInterface;

    constructor(private http: HttpClient) {
    }

    public getUser(): Observable<any> {
        return this.http.get(environment.backend.url + environment.backend.get_user_data_url);
    }

    public updateUser(user: UserInterface): void {
    }

}
