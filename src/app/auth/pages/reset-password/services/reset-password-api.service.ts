import { Injectable } from '@angular/core';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PasswordRecoveryInterface } from './password-recovery.interface';

@Injectable()
export class ResetPasswordApiService {
  private readonly URL = environment.backend.reset_password;

  constructor(private readonly client: ApiClientService) {}

  public reset(data: PasswordRecoveryInterface): Observable<PasswordRecoveryInterface> {
    return this.client.post(this.URL, data);
  }
}
