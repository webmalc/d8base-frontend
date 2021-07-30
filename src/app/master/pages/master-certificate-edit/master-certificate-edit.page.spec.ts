import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { IonicModule } from '@ionic/angular';
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
        imports: [IonicModule.forRoot(), HttpClientTestingModule],
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
