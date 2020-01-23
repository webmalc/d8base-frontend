import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiClientService} from '@app/core/services/api-client.service';

@Injectable()
export class PasswordRecoveryService {

    private readonly PASSWORD_RECOVERY_URL = environment.backend.api_password_recovery_url;

    constructor(protected client: ApiClientService) {
    }

    public recover(email: object) {
        this.client.post(this.PASSWORD_RECOVERY_URL, email).subscribe(
            result => {

            }
        );
    }
}
