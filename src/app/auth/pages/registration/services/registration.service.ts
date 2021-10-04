import { Injectable } from '@angular/core';
import { DefaultRegisterUser, UserLocation } from '@app/api/models';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

@Injectable()
export class RegistrationService {
  @Dispatch()
  public register(user: DefaultRegisterUser, userData?: { location: UserLocation }): CurrentUserActions.Register {
    return new CurrentUserActions.Register(user, userData);
  }
}
