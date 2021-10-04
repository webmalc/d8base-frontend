import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PasswordRecoverPageModule } from '@app/auth/pages/password-recover/password-recover.module';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { of } from 'rxjs';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { PasswordRecoveryService } from '../../services/password-recovery.service';
import { PasswordRecoveryFormComponent } from './password-recovery-form.component';

describe('PasswordRecoveryFormComponent', () => {
  let component: PasswordRecoveryFormComponent;
  let fixture: ComponentFixture<PasswordRecoveryFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [...RootModules(), ComponentTestingModule, PasswordRecoverPageModule],
        providers: [PasswordRecoveryService, { provide: ApiClientService, useValue: { post: () => of() } }],
      }).compileComponents();

      fixture = TestBed.createComponent(PasswordRecoveryFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
