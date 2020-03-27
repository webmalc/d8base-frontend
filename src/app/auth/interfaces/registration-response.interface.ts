import {AuthResponseInterface} from '@app/auth/interfaces/auth-response.interface';
import {UserInterface} from '@app/core/interfaces/user.interface';

export interface RegistrationResponseInterface extends UserInterface {
    token: AuthResponseInterface;
}
