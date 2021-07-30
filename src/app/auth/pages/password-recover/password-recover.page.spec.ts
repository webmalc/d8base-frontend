import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PasswordRecoveryFormComponent } from '../../components/password-recovery-form/password-recovery-form.component';
import { PasswordRecoveryFormService } from '../../forms/password-recovery-form.service';
import { PasswordRecoveryService } from '../../services/password-recovery.service';
import { PasswordRecoverPage } from './password-recover.page';

describe('PasswordRecoverPage', () => {
  let component: PasswordRecoverPage;
  let fixture: ComponentFixture<PasswordRecoverPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PasswordRecoverPage, PasswordRecoveryFormComponent],
        imports: [
          IonicModule.forRoot(),
          ReactiveFormsModule,
          FormsModule,
          RouterTestingModule,
          TranslateModule.forRoot(),
        ],
        providers: [
          PasswordRecoveryService,
          PasswordRecoveryFormService,
          { provide: ApiClientService, useValue: { post: () => of() } },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PasswordRecoverPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test nested component exists', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-password-recovery-form')).not.toBe(null);
    expect(compiled.querySelector('app-password-recovery-form ion-input[name="email"]')).not.toBe(null);
    expect(compiled.querySelector('app-password-recovery-form ion-button[type="submit"]')).not.toBe(null);
  });
});
