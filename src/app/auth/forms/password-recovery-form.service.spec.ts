import { TestBed } from '@angular/core/testing';

import { PasswordRecoveryFormService } from './password-recovery-form.service';

describe('PasswordRecoveryFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordRecoveryFormService = TestBed.get(PasswordRecoveryFormService);
    expect(service).toBeTruthy();
  });
});
