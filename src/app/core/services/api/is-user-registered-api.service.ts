import { Injectable } from '@angular/core';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { normalizeString } from '@app/core/functions/string.functions';

@Injectable({
  providedIn: 'root',
})
export class IsUserRegisteredApiService {
  private readonly url = environment.backend.is_user_registered;

  constructor(private readonly client: ApiClientService) {}

  public isEmailRegistered(email: string): Observable<boolean> {
    // TODO use AccountsService when swagger annotations is fixed
    return this.client
      .post<{ is_registered: boolean }, { email: string }>(this.url, { email: normalizeString(email) })
      .pipe(map(val => val.is_registered));
  }
}
