import { TestBed } from '@angular/core/testing';

import { AuthenticationFactory } from './authentication-factory.service';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AuthenticationService, useValue: 'main' },
    ],
  }));

  it('should be created', () => {
    const service: AuthenticationFactory = TestBed.inject(AuthenticationFactory);
    expect(service).toBeTruthy();
  });
});
