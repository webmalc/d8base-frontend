import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ErrorFlashbagComponent} from '../../../shared/components/error-flashbag/error-flashbag.component';
import {SharedModule} from '../../../shared/shared.module';
import {ResetPasswordApiService} from '../../services/reset-password-api.service';
import { ResetPasswordPage } from './reset-password.page';

describe('ResetPasswordPage', () => {
  let component: ResetPasswordPage;
  let fixture: ComponentFixture<ResetPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordPage, ErrorFlashbagComponent ],
      imports: [
          IonicModule,
          ReactiveFormsModule,
          RouterTestingModule,
          HttpClientTestingModule
      ],
        providers: [
            ResetPasswordApiService
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    xit('should be some tests');
});
