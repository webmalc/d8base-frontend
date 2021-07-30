import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';

import { CertificatesApiService } from '../../services/certificates-api.service';
import { MasterCertificateEditPage } from './master-certificate-edit.page';

describe('MasterCertificateEditPage', () => {
  let component: MasterCertificateEditPage;
  let fixture: ComponentFixture<MasterCertificateEditPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterCertificateEditPage],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
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
          CertificatesApiService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterCertificateEditPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
