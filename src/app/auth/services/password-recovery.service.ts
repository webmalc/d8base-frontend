import { Injectable } from '@angular/core';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const SEND_RESET_PASSWORD_LINK_URL = environment.backend.reset_password_link;

@Injectable()
export class PasswordRecoveryService {
  constructor(protected client: ApiClientService) {}

  public recover(email: object): Observable<any> {
    return this.client.post(SEND_RESET_PASSWORD_LINK_URL, email);
  }
}
