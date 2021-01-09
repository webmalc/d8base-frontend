import { Injectable } from '@angular/core';
import { PasswordRecoveryInterface } from '@app/auth/interfaces/password-recovery.interface';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ResetPasswordApiService {

    private readonly URL = environment.backend.reset_password;

    constructor(private readonly client: ApiClientService) {
    }

    public reset(data: PasswordRecoveryInterface): Observable<PasswordRecoveryInterface> {
        return this.client.post(this.URL, data);
    }
}
