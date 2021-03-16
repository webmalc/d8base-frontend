import { Injectable } from '@angular/core';
import { UserLanguage } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserLanguagesApiCache extends ApiCache<UserLanguage> {
  constructor(private readonly api: AccountsService) {
    super();
  }

  protected read(id): Observable<UserLanguage> {
    return this.api.accountsLanguagesRead(id);
  }
}
