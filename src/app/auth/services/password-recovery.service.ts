import { Injectable } from '@angular/core';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class PasswordRecoveryService {

  private readonly SEND_RESET_PASSWORD_LINK_URL = environment.backend.reset_password_link;

  constructor(protected client: ApiClientService) {
  }

  public recover(email: object): Observable<any> {
    return this.client.post(this.SEND_RESET_PASSWORD_LINK_URL, email);
  }
}
