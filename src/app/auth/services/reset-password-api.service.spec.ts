import { TestBed } from '@angular/core/testing';

import { ResetPasswordApiService } from './reset-password-api.service';

describe('ResetPasswordApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ResetPasswordApiService = TestBed.get(ResetPasswordApiService);
    expect(service).toBeTruthy();
  });
});
