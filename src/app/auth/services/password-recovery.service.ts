import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class PasswordRecoveryService {

    private readonly PASSWORD_RECOVERY_URL = environment.backend.password_recovery;

    constructor(protected client: ApiClientService) {
    }

    public recover(email: object): any {
        this.client.post(this.PASSWORD_RECOVERY_URL, email).subscribe(
            // result => {
            //
            // }
        );
    }
}
