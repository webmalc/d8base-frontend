import { TestBed } from '@angular/core/testing';

import { AbstractAuthService } from './abstract-auth.service';

describe('AbstractAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractAuthService = TestBed.get(AbstractAuthService);
    expect(service).toBeTruthy();
  });
});
