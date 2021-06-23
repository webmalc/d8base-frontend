import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { of } from 'rxjs';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';
import { UserContactEditComponent } from './user-contact-edit.component';

describe('UserContactEditComponent', () => {
  let component: UserContactEditComponent;
  let fixture: ComponentFixture<UserContactEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserContactEditComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
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
              data: of({ isMaster: false }),
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
