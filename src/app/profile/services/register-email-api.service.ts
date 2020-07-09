import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class RegisterEmailApiService {

    private readonly url = environment.backend.register_email;

    constructor(private readonly http: HttpClient) { }

    public post(email: string): Observable<{detail: string }> {
        return this.http.post(environment.backend.url + this.url, {email}) as Observable<{detail: string }>;
    }
}
