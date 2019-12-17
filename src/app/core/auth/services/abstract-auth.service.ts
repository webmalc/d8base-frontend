import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export abstract class AbstractAuthService {

  protected constructor(protected http: HttpClient) {}

  public post(data: object, url): Observable<object> {
    return this.http.post(this.getHost() + url, JSON.stringify(data), this.getHeaders());
  }

  private getHeaders(): {headers: HttpHeaders} {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private getHost(): string {
    return environment.backend.url;
  }

}
