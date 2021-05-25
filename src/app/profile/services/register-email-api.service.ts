import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterEmailApiService {
  private readonly url = environment.backend.register_email;

  constructor(private readonly http: HttpClient) {}

  public post(email: string): Observable<{ detail: string }> {
    return this.http.post(environment.backend.url + this.url, { email }) as Observable<{ detail: string }>;
  }
}
