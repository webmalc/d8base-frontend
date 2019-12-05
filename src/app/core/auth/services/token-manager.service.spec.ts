import { TestBed } from '@angular/core/testing';

import { TokenManagerService } from './token-manager.service';

describe('StorageTokenManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenManagerService = TestBed.get(TokenManagerService);
    expect(service).toBeTruthy();
  });
});
