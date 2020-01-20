import {Injectable} from '@angular/core';
import {AbstractAuthService} from '@app/auth/services/abstract-auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class PasswordRecoveryService extends AbstractAuthService {

    private readonly PASSWORD_RECOVERY_URL = environment.backend.api_password_recovery_url

    constructor(protected http: HttpClient) {
        super(http);
    }

    public recover(email: object) {
        this.post(email, this.PASSWORD_RECOVERY_URL).subscribe(
            result => {

            }
        );
    }
}
