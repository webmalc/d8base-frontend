import { Injectable } from '@angular/core';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IsUserRegisteredApiService {
  private readonly url = environment.backend.is_user_registered;

  constructor(private readonly client: ApiClientService) {}

  public isEmailRegistered(email: string): Observable<boolean> {
    // @ts-ignore
    return this.client
      .post<{ is_registered: boolean }>(this.url, { email })
      .pipe(map((val: { is_registered: boolean }) => val.is_registered));
  }
}
