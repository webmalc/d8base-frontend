import { TestBed } from '@angular/core/testing';

import { ResetPasswordFormService } from './reset-password-form.service';

describe('ResetPasswordFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: ResetPasswordFormService = TestBed.get(ResetPasswordFormService);
    expect(service).toBeTruthy();
  });
});
