import {HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

export class ApiClientServiceMock {
  public post(url: string, data: {username: string, password: string}): Observable<any> {
      if (data.username === 'valid' && data.password === 'valid_pass') {
          return of(true);
      }

      return throwError(new HttpErrorResponse({status: 400, error: {error: 'invalid_grant'}}));
  }
}
