import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { UserManagerMock } from 'src/testing/mocks/user-manager-mock.spec';
import { ProfileService } from '../../services/profile.service';
import { RegisterEmailApiService } from '../../services/register-email-api.service';
import { UserEditComponent } from './user-edit.component';

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditComponent],
      imports: [
        TranslateModule.forRoot(),
        IonicModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        ProfileService,
        Location,
        FormBuilder,
        RegisterEmailApiService,
        { provide: StorageManagerService, useClass: StorageManagerMock },
        { provide: UserManagerService, useClass: UserManagerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
