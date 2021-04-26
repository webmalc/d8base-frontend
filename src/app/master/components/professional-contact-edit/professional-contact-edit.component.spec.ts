import { Location } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { ContactApiService } from '@app/profile/services/contact-api.service';
import { UserContactApiService } from '@app/profile/services/user-contact-api.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';
import { ProfessionalContactEditComponent } from './professional-contact-edit.component';


describe('ProfessionalContactEditComponent', () => {
  let component: ProfessionalContactEditComponent;
  let fixture: ComponentFixture<ProfessionalContactEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfessionalContactEditComponent],
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

      fixture = TestBed.createComponent(ProfessionalContactEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
