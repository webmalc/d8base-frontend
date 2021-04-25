import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { ContactApiService } from '@app/profile/services/contact-api.service';
import { UserContactApiService } from '@app/profile/services/user-contact-api.service';
import { UserContactEditComponent } from '@app/shared/components/user-contact-edit/user-contact-edit.component';
import { of } from 'rxjs';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

describe('UserContactEditComponent', () => {
  let component: UserContactEditComponent;
  let fixture: ComponentFixture<UserContactEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserContactEditComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          UserContactApiService,
          ContactApiService,
          FormBuilder,
          Location,
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get(): string {
                    return '';
                  },
                },
              },
            },
          },
          { provide: StorageManagerService, useClass: StorageManagerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UserContactEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
