import { TestBed } from '@angular/core/testing';
import { DefaultRegisterUser } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { ApiClientService } from '@app/core/services/api-client.service';
import { CurrentUserSelectors } from '@app/store/current-user/current-user.selectors';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ComponentTestingModule, ROOT_MODULES } from 'src/testing/component-testing.module';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';
import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  const userModel: DefaultRegisterUser = {
    email: 'user@example.com',
    first_name: 'name',
    last_name: 'lastName',
    password: 'pass',
    password_confirm: 'pass',
  };
  const tokenData: AuthResponseInterface = {
    access_token: 'string',
    expires_in: 123,
    token_type: 'string',
    scope: 'string',
    refresh_token: 'string',
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ...ROOT_MODULES,
      ComponentTestingModule,
    ],
    providers: [
      RegistrationService,
      {
        provide: AccountsService,
        useValue: {
          accountsProfileList: () => of([{ id: 1, email: 'tester' }]),
          accountsRegisterCreate: () => of(tokenData),
        },
      },
      { provide: ApiClientService, useValue: { post: () => of(tokenData) } },
    ],
  }));

  it('should be created', () => {
    const service: RegistrationService = TestBed.inject(RegistrationService);
    expect(service).toBeTruthy();
  });

  it('test #register', (done) => {
    const service: RegistrationService = TestBed.inject(RegistrationService);
    const store: Store = TestBed.inject(Store);

    store.select(CurrentUserSelectors.profile)
      .subscribe(
        profile => {
          // TODO check profile
          done();
        },
      );

    service.register(
      userModel,
    );
  });
});
