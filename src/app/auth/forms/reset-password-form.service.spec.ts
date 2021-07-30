import { TestBed } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ResetPasswordFormService } from './reset-password-form.service';

describe('ResetPasswordFormService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [ResetPasswordFormService],
    }),
  );

  it('should be created', () => {
    const service: ResetPasswordFormService = TestBed.inject(ResetPasswordFormService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
