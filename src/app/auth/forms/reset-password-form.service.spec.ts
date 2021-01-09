import { TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordFormService } from './reset-password-form.service';

describe('ResetPasswordFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
    ],
  }));

  it('should be created', () => {
    const service: ResetPasswordFormService = TestBed.inject(ResetPasswordFormService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
