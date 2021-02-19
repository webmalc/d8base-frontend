import { Location } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
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
        ...RootModules(),
        ComponentTestingModule,
      ],
      providers: [
        ProfileService,
        Location,
        FormBuilder,
        RegisterEmailApiService,
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
