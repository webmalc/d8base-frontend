import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiClientService } from '@app/core/services/api-client.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { PasswordRecoveryFormService } from '../../forms/password-recovery-form.service';
import { PasswordRecoveryService } from '../../services/password-recovery.service';
import { PasswordRecoveryFormComponent } from './password-recovery-form.component';

describe('PasswordRecoveryFormComponent', () => {
  let component: PasswordRecoveryFormComponent;
  let fixture: ComponentFixture<PasswordRecoveryFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRecoveryFormComponent],
      imports: [IonicModule, ReactiveFormsModule, FormsModule, RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        PasswordRecoveryFormService,
        PasswordRecoveryService,
        { provide: ApiClientService, useValue: { post: () => of() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordRecoveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
