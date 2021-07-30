import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResetPasswordFormService } from '@app/auth/forms/reset-password-form.service';
import { ErrorFlashbagComponent } from '@app/shared/components/error-flashbag/error-flashbag.component';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ResetPasswordApiService } from '../../services/reset-password-api.service';
import { ResetPasswordPage } from './reset-password.page';

describe('ResetPasswordPage', () => {
  let component: ResetPasswordPage;
  let fixture: ComponentFixture<ResetPasswordPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResetPasswordPage, ErrorFlashbagComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [ResetPasswordApiService, ResetPasswordFormService],
      }).compileComponents();

      fixture = TestBed.createComponent(ResetPasswordPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
