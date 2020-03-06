import { TestBed } from '@angular/core/testing';

import {AuthenticationFactory} from '../../core/services/authentication-factory.service';
import {UserManagerService} from '../../core/services/user-manager.service';
import { ProfileService } from './profile.service';


class ProfileServiceStub {
}

// tslint:disable-next-line:max-classes-per-file
class UserManagerServiceStub {
}

// tslint:disable-next-line:max-classes-per-file
class AuthenticationFactoryStub {
}

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [
          {
              provide: ProfileService,
              useClass: ProfileServiceStub
          }
          ,
          {
              provide: UserManagerService,
              useClass: UserManagerServiceStub
          },
          {
              provide: AuthenticationFactory,
              useClass: AuthenticationFactoryStub
          },
      ]
  }));

  it('should be created', () => {
    const service: ProfileService = TestBed.inject(ProfileService);
    expect(service).toBeTruthy();
  });
});
