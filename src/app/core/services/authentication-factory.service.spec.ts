import { TestBed } from '@angular/core/testing';

import { AuthenticationFactory } from './authentication-factory.service';

describe('AuthenticationFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationFactory = TestBed.get(AuthenticationFactory);
    expect(service).toBeTruthy();
  });
});
